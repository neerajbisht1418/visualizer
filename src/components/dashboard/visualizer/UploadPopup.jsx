import React, { useRef, useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoCropSharp } from "react-icons/io5";
import { MdOutlineRotate90DegreesCcw } from "react-icons/md";
import { LuFlipHorizontal2, LuFlipVertical2 } from "react-icons/lu";
import { fabric } from "fabric";

const UploadPopup = ({ open, onClose, image, onSave, itemName, onCancel }) => {
  if (!open) return null;

  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [imageURL, setImageURL] = useState("");
  const [active, setActive] = useState();
  const [cropMode, setCropMode] = useState(false);
  const [cropRect, setCropRect] = useState(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    fabricCanvasRef.current = canvas;

    fabric.Image.fromURL(image, (img) => {
      img.set({ crossOrigin: "anonymous" });
      img.scaleToWidth(500);
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
    return () => {
      fabricCanvasRef.current.dispose();
    };
  }, [image]);

  const handleRotate = () => {
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.rotate((activeObject.angle || 0) + 90);
      canvas.requestRenderAll();
    }
    setTimeout(() => handleGetImageURL(), 2000);
  };

  const handleFlip = (direction) => {
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      if (direction === "horizontal") {
        activeObject.set("flipX", !activeObject.flipX);
      } else if (direction === "vertical") {
        activeObject.set("flipY", !activeObject.flipY);
      }
      canvas.requestRenderAll();
    }
    setTimeout(() => handleGetImageURL(), 2000);
  };

  const handleGetImageURL = () => {
    const canvas = fabricCanvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    setImageURL(dataURL);
  };

  const handleStartCrop = () => {
    const canvas = fabricCanvasRef.current;
    setCropMode(true);

    if (cropRect) {
      canvas.remove(cropRect);
      setCropRect(null);
    }

    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      width: 200,
      height: 200,
      fill: "transparent",
      stroke: "transparent",
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      cornerStyle: "circle",
      cornerColor: "black",
      cornerSize: 12,
      padding: 10,
    });

    canvas.add(rect);
    setCropRect(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();

    canvas.on("mouse:up", () => {
      setCropMode(false);
    });
  };

  const handleCrop = () => {
    const canvas = fabricCanvasRef.current;

    if (cropRect) {
      canvas.remove(cropRect);
      canvas.renderAll();

      const { left, top, width, height } = cropRect.getBoundingRect();
      const img = canvas.getObjects("image")[0];

      const cropCanvas = document.createElement("canvas");
      cropCanvas.width = width;
      cropCanvas.height = height;
      const cropContext = cropCanvas.getContext("2d");

      cropContext.drawImage(
        canvas.lowerCanvasEl,
        left,
        top,
        width,
        height,
        0,
        0,
        width,
        height
      );

      setImageURL(cropCanvas.toDataURL("image/png"));

      setCropRect(null);
      canvas.renderAll();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-[1000px] shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b-2 border-gray-300">
          <h2 className="font-bold text-xl text-secondary">{itemName}</h2>
          <button
            onClick={() => {
              onClose();
              onCancel();
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="flex p-6 gap-6">
          <div className="flex-1">
            <div className="bg-gray-200 rounded-md border border-gray-300">
              <canvas ref={canvasRef} width={800} height={600} />
            </div>
            <div className="flex mt-4 gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActive(1);
                  handleStartCrop();
                }}
                className={`btn ${active === 1 ? "btn-active" : "btn-outline"}`}
                title="Start Cropping"
              >
                <IoCropSharp size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRotate();
                  setActive(2);
                }}
                className={`btn ${active === 2 ? "btn-active" : "btn-outline"}`}
                title="Rotate"
              >
                <MdOutlineRotate90DegreesCcw size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFlip("vertical");
                  setActive(3);
                }}
                className={`btn ${active === 3 ? "btn-active" : "btn-outline"}`}
                title="Flip Vertical"
              >
                <LuFlipVertical2 size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFlip("horizontal");
                  setActive(4);
                }}
                className={`btn ${active === 4 ? "btn-active" : "btn-outline"}`}
                title="Flip Horizontal"
              >
                <LuFlipHorizontal2 size={20} />
              </button>
              <button
                onClick={handleCrop}
                className="btn btn-primary ml-auto"
                disabled={!cropRect}
              >
                Apply Crop
              </button>
            </div>
          </div>
          <div className="flex-none">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <img
              src={imageURL || image}
              alt="Preview"
              className="w-40 h-48 object-cover rounded-lg border border-gray-300 shadow-md"
            />
          </div>
        </div>
        <div className="flex justify-end p-4 bg-gray-100 border-t-2 border-gray-300">
          <button
            onClick={() => onSave(imageURL || image)}
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPopup;
