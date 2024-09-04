
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');

    setTimeout(function() {
        loading.style.display = 'none';
        content.style.display = 'block';

        fetch('public.json')
            .then(response => response.json())
            .then(images => {

                images = shuffleArray(images);

                const gallery = document.getElementById('gallery');
                images.forEach(image => {
                    const item = document.createElement('div');
                    item.className = 'gallery-item';

                    const imgElement = document.createElement('img');
                    imgElement.src = image.src;
                    imgElement.alt = image.alt;
                    imgElement.loading = "lazy";
                    imgElement.id = image.id;

                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'info';



                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.textContent = image.comment;


                    infoDiv.appendChild(commentElement);
                    item.appendChild(imgElement);
                    item.appendChild(infoDiv);
                    gallery.appendChild(item);
                });
            })
            .catch(error => console.error('画像の読み込みエラー:', error));
    }, 2000); 
});

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');

    gallery.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const imageId = event.target.id; 
        }
    });
    gallery.addEventListener('touchend', function(event) {

        if (event.target.tagName === 'IMG') {
            const imageId = event.target.id; 
            event.preventDefault(); 
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalComment = document.getElementById('modal-comment');
    const closeModal = document.getElementById('modal-close');

    gallery.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const imageId = event.target.id;

            fetch('public.json')
                .then(response => response.json())
                .then(images => {
                    const imageData = images.find(img => img.id === imageId);
                    if (imageData) {
                        modalImage.src = imageData.src;
                        modalComment.textContent = imageData.comment;
                        modal.style.display = 'flex'; 
                    }
                })
                .catch(error => console.error('画像データの取得エラー:', error));
        }
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none'; 
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; 
        }
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((error) => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }

document.getElementById('reloadButton').addEventListener('click', function() {
    location.reload();
});

const scrollableContainer = document.getElementById('mainblock');

function scrollToTop() {
    scrollableContainer.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}
document.getElementById('scrollToTop').addEventListener('click', scrollToTop);


  

