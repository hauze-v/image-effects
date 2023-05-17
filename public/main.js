async function init() {
  let rustApp = null;

  try {
    rustApp = await import('../pkg');
  } catch(err) {
    console.error(err)
    return;
  }

  const input = document.getElementById('upload');
  // Allows us to save file uploaded by the user in string format instead of binary (input.files[0])
  const fileReader = new FileReader();

  // This will run when the file upload has completed.
  fileReader.onloadend = () => {
    const base64 = fileReader.result.replace( // tag on this replace method to remove the prepended metadata before the encoding
      /^data:image\/(png|jpeg|jpg);base64,/, ''
    );

    let img_data_url = rustApp.grayscale(base64);
    document.getElementById('new-img').setAttribute(
      'src', img_data_url
    )
  }

  input.addEventListener('change', () => {
    fileReader.readAsDataURL(input.files[0]);
  });
}

init();