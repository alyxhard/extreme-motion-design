import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/**
 * Fundo Frutiger Aero: gradiente suave de céu, ondas orgânicas translúcidas
 * e partículas cintilantes (sparkles) em profundidade.
 * Tudo derivado estritamente de useCurrentFrame().
 */
export const AeroSky: React.FC<{
	accentColor?: string;
	topPillText?: string;
}> = ({accentColor = '#74B9FF'}) => {
	const frame = useCurrentFrame();

	// Movimento lento das ondas/nuvens translúcidas
	const wave1 = Math.sin(frame * 0.02) * 15;
	const wave2 = Math.cos(frame * 0.018) * 12;
	const wave3 = Math.sin(frame * 0.025 + 1) * 18;

	// Sparkles com pulso determinístico
	const sparkles = [
		{x: 180, y: 160, baseSize: 18, phase: 0},
		{x: 880, y: 190, baseSize: 22, phase: 1.5},
		{x: 140, y: 380, baseSize: 16, phase: 3.0},
		{x: 920, y: 440, baseSize: 24, phase: 4.2},
		{x: 220, y: 720, baseSize: 14, phase: 2.1},
		{x: 840, y: 760, baseSize: 20, phase: 0.8},
		{x: 520, y: 880, baseSize: 15, phase: 5.0},
		{x: 380, y: 130, baseSize: 16, phase: 2.8},
		{x: 740, y: 280, baseSize: 14, phase: 3.9},
	];

	return (
		<AbsoluteFill
			style={{
				background: 'radial-gradient(circle at 50% 25%, #C2E2FE 0%, #9BCBFA 45%, #7BAFE6 100%)',
				overflow: 'hidden',
			}}
		>
			{/* Camada de luz superior / brilho esférico */}
			<div
				style={{
					position: 'absolute',
					top: -150,
					left: '15%',
					width: 760,
					height: 500,
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%)',
					filter: 'blur(30px)',
					pointerEvents: 'none',
				}}
			/>

			{/* Formas orgânicas de vidro / ondas líquidas translúcidas */}
			<svg
				width="1080"
				height="1080"
				viewBox="0 0 1080 1080"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					pointerEvents: 'none',
				}}
			>
				<defs>
					<linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
						<stop offset="100%" stopColor="#8FC6FD" stopOpacity="0.1" />
					</linearGradient>
					<linearGradient id="waveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#D2E8FF" stopOpacity="0.35" />
						<stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
					</linearGradient>
				</defs>

				{/* Onda curva superior esquerda */}
				<path
					d={`M -50 -50 Q 240 ${140 + wave1} 360 ${320 + wave2} T 80 620 L -50 620 Z`}
					fill="url(#waveGrad1)"
				/>

				{/* Onda curva superior direita */}
				<path
					d={`M 1130 -50 Q 820 ${180 - wave2} 760 ${380 + wave1} T 1130 580 Z`}
					fill="url(#waveGrad2)"
				/>

				{/* Onda inferior suave */}
				<path
					d={`M -50 1130 Q 320 ${920 + wave3} 640 ${960 - wave1} T 1130 920 L 1130 1130 Z`}
					fill="rgba(255, 255, 255, 0.22)"
				/>
			</svg>

			{/* Sparkles / Estrelas 4 pontas Frutiger Aero */}
			{sparkles.map((sp, idx) => {
				const cycle = (frame * 0.08 + sp.phase) % (Math.PI * 2);
				const scale = 0.75 + Math.sin(cycle) * 0.28;
				const rot = (frame * 0.8 + idx * 45) % 360;
				const alpha = 0.5 + Math.sin(cycle) * 0.45;

				return (
					<div
						key={idx}
						style={{
							position: 'absolute',
							left: sp.x,
							top: sp.y,
							transform: `translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`,
							opacity: alpha,
							pointerEvents: 'none',
						}}
					>
						<svg
							width={sp.baseSize}
							height={sp.baseSize}
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z"
								fill="#FFFFFF"
							/>
						</svg>
					</div>
				);
			})}
		</AbsoluteFill>
	);
};
