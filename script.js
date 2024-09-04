

fetch('public.json')
.then(response => response.json())
.then(images => {
    const gallery = document.getElementById('gallery');
    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.loading = "lazy";

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


window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');

    loading.style.display = 'none';
    content.style.display = 'block';
});
