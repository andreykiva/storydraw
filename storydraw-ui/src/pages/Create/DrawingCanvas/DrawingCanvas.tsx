import React, { useRef, useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';

const DrawingCanvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [color, setColor] = useState('#000000'); // Цвет кисти
	const [lineWidth, setLineWidth] = useState(5); // Толщина линии
	const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 }); // Размер холста
	const [scale, setScale] = useState(1); // Масштаб
	const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null); // Храним последнюю точку

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = canvasSize.width;
		canvas.height = canvasSize.height;
		canvas.style.width = `${canvasSize.width}px`;
		canvas.style.height = `${canvasSize.height}px`;

		const context = canvas.getContext('2d');
		if (context) {
			// Применяем текущий масштаб
			context.scale(scale, scale);
			context.lineCap = 'round'; // Закругление концов линий
			context.strokeStyle = color; // Цвет кисти
			context.lineWidth = lineWidth; // Толщина линии
			contextRef.current = context;
		}
	}, [color, lineWidth, canvasSize, scale]);

	const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const { offsetX, offsetY } = event.nativeEvent;
		// Учитываем текущий масштаб при вычислении координат
		const scaledX = offsetX / scale;
		const scaledY = offsetY / scale;

		contextRef.current?.beginPath();
		setLastPoint({ x: scaledX, y: scaledY });
		setIsDrawing(true);
	};

	const finishDrawing = () => {
		contextRef.current?.closePath();
		setIsDrawing(false);
		setLastPoint(null); // Сбрасываем последнюю точку
	};

	const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing || !lastPoint) return;
		const { offsetX, offsetY } = event.nativeEvent;

		// Корректируем координаты с учетом масштаба
		const currentX = offsetX / scale;
		const currentY = offsetY / scale;

		const context = contextRef.current;
		if (context) {
			// Рисуем линию до текущей точки
			context.beginPath();
			context.moveTo(lastPoint.x, lastPoint.y);
			context.lineTo(currentX, currentY);
			context.stroke();

			// Обновляем последнюю точку
			setLastPoint({ x: currentX, y: currentY });
		}
	};

	return (
		<div>
			{/* Элементы управления */}
			<div className="controls">
				<SketchPicker />
				<label>
					Line Width:
					<input type="range" min="1" max="50" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} />
				</label>
				<label>
					Canvas Width:
					<input
						type="number"
						value={canvasSize.width}
						onChange={(e) => setCanvasSize({ ...canvasSize, width: Number(e.target.value) })}
					/>
				</label>
				<label>
					Canvas Height:
					<input
						type="number"
						value={canvasSize.height}
						onChange={(e) => setCanvasSize({ ...canvasSize, height: Number(e.target.value) })}
					/>
				</label>
				<label>
					Zoom:
					<input type="range" min="0.1" max="5" step="0.1" value={scale} onChange={(e) => setScale(Number(e.target.value))} />
				</label>
			</div>

			{/* Холст для рисования */}
			<canvas
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseUp={finishDrawing}
				onMouseMove={draw}
				onMouseLeave={finishDrawing}
				style={{
					border: '1px solid black',
					marginTop: '10px',
					background: '#fff',
				}}
			/>
		</div>
	);
};

export default DrawingCanvas;
