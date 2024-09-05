import { useEffect, useState } from "react";
import UploadPopup from "./UploadPopup";
import Tooltip from "./Tooltip";

const Upload = (props) => {
  const [items, setItems] = useState(props?.uploadOptions?.uploadOptions);
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentItemName, setCurrentItemName] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleImageUpload = (e, id, name) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setCurrentItemId(id);
        setCurrentItemName(name);
        setOpen(true);
        props?.setCurrentTextures(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (img) => {
    setItems((prevItems) =>
      prevItems?.map((item) =>
        item.id === currentItemId ? { ...item, image: img } : item
      )
    );

    props?.setItem((prevItems) => {
      const updatedItems = prevItems?.uploadOptions?.map((item) => {
        return item.id === currentItemId ? { ...item, image: img } : item;
      });
      return {
        ...prevItems,
        uploadOptions: updatedItems,
      };
    });

    setOpen(false);
    setPreviewImage(null);
    setCurrentItemId(null);
    setCurrentItemName("");
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setCurrentItemId(null);
    setCurrentItemName("");
    setOpen(false);
  };

  const handleCategory = () => {
    props?.handleCategory(2);
  };

  useEffect(() => {
    {
      open
        ? document.body.classList.add("overflow-hidden")
        : document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <>
      <UploadPopup
        open={open}
        onClose={() => setOpen(false)}
        image={previewImage}
        itemName={currentItemName}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <div className="flex justify-between px-[3.125rem]">
        <h3 className="font-[700] text-[1.625rem] leading-[1.95rem] text-secondary Barlow">
          Upload Image
        </h3>
        <Tooltip
          setTooltipVisible={setTooltipVisible}
          tooltipVisible={tooltipVisible}
        />
      </div>
      <div className="flex flex-col justify-center px-[3.125rem] py-[3.130rem]">
        <div className="flex flex-wrap gap-[1.5rem]">
          {items &&
            items?.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col items-center justify-center ${
                  item.image ? "border" : "outline-dotted "
                } 
              ${item.image ? "border-1" : "outline-1 "}
              ${
                item.image ? "border-primaryInputBorder" : "outline-primary"
              } rounded-[.5rem] bg-[#F3F0FF] md:w-[calc((100%/3)-1.125rem)] sm:w-[calc(50%-1.125rem)] w-full min-h-[15.875rem] cursor-pointer`}
              >
                {!item.image && (
                  <>
                    <label htmlFor={`file-upload-${item.id}`}>
                      <img
                        src={"/uploadIcon.png"}
                        className="w-[4rem] h-[4rem] py-[0.75rem] object-contain cursor-pointer"
                        alt="Upload Icon"
                      />
                    </label>
                    <input
                      id={`file-upload-${item.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, item.id, item.name)}
                    />
                    <span className="text-secondary font-[500] text-[1.1rem] leading-[1.463rem] Barlow pb-[1.5rem]">
                      {item.name}
                    </span>
                  </>
                )}
                {item.image && (
                  <>
                    <img
                      src={item.image}
                      className="w-[14.438rem] h-[18rem] py-[0.75rem] object-contain"
                    />
                    <span className="text-primary font-[600] text-[1.1rem] leading-[1.35rem] Barlow pb-[1.5rem]">
                      {item.name}
                    </span>
                  </>
                )}
              </div>
            ))}
        </div>
        <div className="flex justify-end pt-[3.130rem]">
          <button onClick={() => handleCategory()} className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Upload;
