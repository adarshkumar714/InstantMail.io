
document.getElementById('uploadForm').onsubmit = async function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0]);

    const response = await fetch('http://192.168.126.241:3000/upload', {
        method: 'post',
        body: formData,
    });

    if (response.ok) {
        console.log('File uploaded successfully');
    } else {
        console.error('Upload failed');
    }
};

