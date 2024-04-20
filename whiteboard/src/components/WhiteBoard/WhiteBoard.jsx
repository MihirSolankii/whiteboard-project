import React, { useRef, useState, useEffect } from "react";
// import './WhiteBoard.css'

function WhiteBoard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [currentColor, setCurrentColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(3);
  const [drawingActions, setDrawingActions] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({ color: 'black', lineWidth: 3 });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 1513; // Adjust the width as needed
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      setContext(ctx);
      reDrawPreviousData(ctx);
    }
  }, []);

  const startDrawing = (e) => {
    if (context) {
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setDrawing(true);
    }
  };

  const draw = (e) => {
    if (!drawing) return;
    if (context) {
      context.lineWidth = currentStyle.lineWidth;
      context.strokeStyle = currentStyle.color;
      context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      context.stroke();
      setCurrentPath([...currentPath, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);
    }
  };

  const endDrawing = () => {
    setDrawing(false);
    if (context) {
      context.closePath();
    }
    if (currentPath.length > 0) {
      setDrawingActions([...drawingActions, { path: currentPath, style: currentStyle }]);
    }
    setCurrentPath([]);
  };

  const changeColor = (color) => {
    setCurrentColor(color);
    setCurrentStyle({ ...currentStyle, color });
  };

  const changeWidth = (width) => {
    setLineWidth(width);
    setCurrentStyle({ ...currentStyle, lineWidth: width });
  };

  const undoDrawing = () => {
    if (drawingActions.length > 0) {
      drawingActions.pop();
      const newContext = canvasRef.current.getContext("2d");
      newContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      reDrawPreviousData(newContext);
    }
  };

  const clearDrawing = () => {
    setDrawingActions([]);
    setCurrentPath([]);
    const newContext = canvasRef.current.getContext("2d");
    newContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const reDrawPreviousData = (ctx) => {
    drawingActions.forEach(({ path, style }) => {
      ctx.beginPath();
      ctx.strokeStyle = style.color;
      ctx.lineWidth = style.lineWidth;
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((point, index) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'whiteboard.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
  };

  return (
    <div >
      <canvas 
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        className="border border-gray-800 w-[150px]"
        style={{ cursor: 'crosshair'}} 
      />
      
      <div className="abc">
      <div className="flex justify-center space-x-4">
      <input 
          type="color" 
          value={currentColor} 
          onChange={(e) => changeColor(e.target.value)} 
          className="mr-4"
        />
</div>

<div className="flex-grow">
<div className="flex justify-center my-4">
        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={undoDrawing}>Undo</button>
        <button className="text-sm bg-gray-200 text-gray-800 py-2 px-4 rounded ml-2" onClick={clearDrawing}>Clear</button>
        <button className="text-sm bg-blue-500 text-white py-2 px-4 rounded ml-2" onClick={saveDrawing}>Save</button>
</div>
</div>
<input type="range" min="1" max="10" value={lineWidth} onChange={(e)=> changeWidth(e.target.value)}/>

      </div>
    </div>
  );
}

export default WhiteBoard;
