
document.addEventListener('DOMContentLoaded', function() {
    let galleryConfig = null;
    let projectData = {};

    loadGalleryConfig().then(() => {
        initializeGallery();
    });

    async function loadGalleryConfig() {
        try {
            console.log('Loading gallery config...');
            const response = await fetch('../config/gallery-projects.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            galleryConfig = await response.json();
            console.log('Gallery config loaded:', galleryConfig);

            galleryConfig.projects.forEach(project => {
                projectData[project.id] = {
                    title: project.title,
                    images: project.images
                };
            });

            generateGalleryHTML();
            console.log('Gallery HTML generated successfully');

        } catch (error) {
            setTimeout(bindProjectClickHandlers, 100);
        }
    }

    function generateGalleryHTML() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid || !galleryConfig) return;

        galleryGrid.innerHTML = '';

        galleryConfig.projects.forEach(project => {
            const article = document.createElement('article');
            article.className = 'gallery-project';
            article.setAttribute('data-category', project.category);
            article.setAttribute('data-project', project.id);

            const thumbnailSrc = project.images && project.images.length > 0
                ? project.images[0].src.replace('w=800&h=600', 'w=400&h=300')
                : (project.thumbnail || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop');

            article.innerHTML = `
                <div class="project-image">
                    <img src="${thumbnailSrc}"
                         alt="${project.title} - final result" loading="lazy">
                    <div class="project-overlay">
                        <div>
                            <i class="fas fa-images fa-2x"></i>
                            <p>View Progress</p>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        <div class="project-count">
                            <i class="fas fa-images"></i>
                            <span>${project.progressCount}</span>
                        </div>
                    </div>
                </div>
            `;

            galleryGrid.appendChild(article);
        });

        setTimeout(bindProjectClickHandlers, 100);
    }

    function initializeGallery() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                const galleryProjects = document.querySelectorAll('.gallery-project');
                galleryProjects.forEach(project => {
                    if (filter === 'all' || project.dataset.category === filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });

        setupModalEvents();
    }

    function bindProjectClickHandlers() {
        const galleryProjects = document.querySelectorAll('.gallery-project');
        galleryProjects.forEach(project => {
            project.addEventListener('click', function() {
                const projectId = this.dataset.project;
                const projectInfo = projectData[projectId];

                if (projectInfo) {
                    showModal(projectInfo);
                }
            });
        });
    }

    function showModal(projectInfo) {
        const modal = document.getElementById('galleryModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalImage = document.getElementById('modalImage');
        const imageCounter = document.getElementById('imageCounter');

        modalTitle.textContent = projectInfo.title;
        modalImage.src = projectInfo.images[0].src;
        modalImage.alt = projectInfo.images[0].caption;
        imageCounter.textContent = `1 / ${projectInfo.images.length}`;

        modal.setAttribute('aria-hidden', 'false');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        window.currentProject = projectInfo;
        window.currentImageIndex = 0;

        updateTimeline();
        updateNavigationButtons();

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
    }

    function setupModalEvents() {
        const modal = document.getElementById('galleryModal');
        if (!modal) return;

        const closeBtn = modal.querySelector('.modal-close');
        const prevBtn = modal.querySelector('.nav-prev');
        const nextBtn = modal.querySelector('.nav-next');

        if (closeBtn) {
            closeBtn.onclick = null;
            closeBtn.onclick = closeModal;
        }

        if (prevBtn) {
            prevBtn.onclick = null;
            prevBtn.onclick = showPreviousImage;
        }

        if (nextBtn) {
            nextBtn.onclick = null;
            nextBtn.onclick = showNextImage;
        }

        modal.onclick = function(e) {
            if (e.target === modal) {
                closeModal();
            }
        };

        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.onclick = function(e) {
                e.stopPropagation();
            };
        }

        const keydownHandler = function(e) {
            if (modal && modal.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        e.preventDefault();
                        closeModal();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        showPreviousImage();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        showNextImage();
                        break;
                }
            }
        };

        document.removeEventListener('keydown', window.galleryKeydownHandler);
        window.galleryKeydownHandler = keydownHandler;
        document.addEventListener('keydown', keydownHandler);
    }

    function closeModal() {
        const modal = document.getElementById('galleryModal');
        if (modal) {
            modal.setAttribute('aria-hidden', 'true');
            modal.style.display = 'none';
            document.body.style.overflow = '';
            window.currentProject = null;
            window.currentImageIndex = 0;

            if (window.galleryKeydownHandler) {
                document.removeEventListener('keydown', window.galleryKeydownHandler);
            }
        }
    }

    function showPreviousImage() {
        if (window.currentProject && window.currentImageIndex > 0) {
            window.currentImageIndex--;
            updateModalImage();
        }
    }

    function showNextImage() {
        if (window.currentProject && window.currentImageIndex < window.currentProject.images.length - 1) {
            window.currentImageIndex++;
            updateModalImage();
        }
    }

    function updateModalImage() {
        if (!window.currentProject) return;

        const modalImage = document.getElementById('modalImage');
        const imageCounter = document.getElementById('imageCounter');
        const currentImage = window.currentProject.images[window.currentImageIndex];

        modalImage.src = currentImage.src;
        modalImage.alt = currentImage.caption;
        imageCounter.textContent = `${window.currentImageIndex + 1} / ${window.currentProject.images.length}`;

        updateTimeline();
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        if (!window.currentProject) return;

        const prevBtn = document.querySelector('.nav-prev');
        const nextBtn = document.querySelector('.nav-next');

        if (prevBtn) {
            prevBtn.disabled = window.currentImageIndex === 0;
            prevBtn.style.opacity = window.currentImageIndex === 0 ? '0.3' : '1';
        }
        if (nextBtn) {
            nextBtn.disabled = window.currentImageIndex === window.currentProject.images.length - 1;
            nextBtn.style.opacity = window.currentImageIndex === window.currentProject.images.length - 1 ? '0.3' : '1';
        }
    }

    function updateTimeline() {
        if (!window.currentProject) return;

        const timeline = document.getElementById('progressTimeline');
        if (!timeline) return;

        timeline.innerHTML = '';
        window.currentProject.images.forEach((image, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${index === window.currentImageIndex ? 'active' : ''}`;
            timelineItem.innerHTML = `
                <div class="timeline-number">${index + 1}</div>
                <div class="timeline-content">
                    <h4>Photo ${index + 1}</h4>
                    <p>${image.caption}</p>
                </div>
            `;
            timelineItem.onclick = function() {
                window.currentImageIndex = index;
                updateModalImage();
            };
            timeline.appendChild(timelineItem);
        });
    }
});
