export function FileUpload ({error, handleChange}) {
  return (
  <>
    <div>
      <span>Image</span>
      <input type="file" id="image" name="image" accept="image/png, image/jpeg" className="ml-4" onChange={handleChange}/>
      {error &&
          <span className="text-red-600">Please select an image.</span>
      }
    </div>
  </>
  );
};