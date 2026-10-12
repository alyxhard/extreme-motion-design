import React from 'react';
import {
	AbsoluteFill,
	Audio,
	Sequence,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Grain} from '../components/Fx';

const C = {
	bg: '#0A0B0E',
	green: '#00FF66',
	greenGlow: 'rgba(0, 255, 102, 0.35)',
	dimGreen: '#008F3A',
	textWhite: '#F3EFE6',
	textMuted: '#6B7280',
	trackLine: '#20242C',
	rulerTick: '#3A3F4B',
	diamond: '#FFFFFF',
};

const FONT_SANS = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, "SF Mono", Consolas, monospace';

/** Cena 1: Terminal / Digitação do Prompt */
const TerminalScene: React.FC<{len: number}> = ({len}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const fullText = 'Vamos fazer um vídeo de apresentação';
	// Digitação gradual dos caracteres
	const charsToShow = Math.floor(
		interpolate(frame, [8, len - 16], [0, fullText.length], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		})
	);
	const displayedText = fullText.slice(0, charsToShow);

	// Cursor piscando suavemente
	const cursorBlink = Math.floor(frame / 7) % 2 === 0;

	// Entrada suave da cena
	const opacity = interpolate(frame, [0, 8, len - 8, len], [0, 1, 1, 0]);

	return (
		<AbsoluteFill style={{opacity}}>
			{/* Top Bar Técnica */}
			<div
				style={{
					position: 'absolute',
					top: 80,
					left: 120,
					right: 120,
					display: 'flex',
					justifyContent: 'space-between',
					fontFamily: FONT_MONO,
					fontSize: 22,
					letterSpacing: '1px',
				}}
			>
				<span style={{color: C.green, fontWeight: 600}}>10 um prompt</span>
				<span style={{color: C.textMuted}}>texto digitado</span>
			</div>

			{/* Terminal Central */}
			<div
				style={{
					position: 'absolute',
					top: '42%',
					left: 120,
					right: 120,
					transform: 'translateY(-50%)',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						fontFamily: FONT_MONO,
						fontSize: 44,
						fontWeight: 500,
						color: C.textWhite,
						letterSpacing: '-0.5px',
					}}
				>
					<span style={{color: C.green, marginRight: 16}}>&gt;</span>
					<span>{displayedText}</span>
					<span
						style={{
							display: 'inline-block',
							width: 22,
							height: 48,
							backgroundColor: C.green,
							marginLeft: 8,
							opacity: cursorBlink ? 1 : 0.15,
							boxShadow: cursorBlink ? `0 0 16px ${C.greenGlow}` : 'none',
							verticalAlign: 'middle',
						}}
					/>
				</div>
			</div>

			{/* Subtítulo Inferior */}
			<div
				style={{
					position: 'absolute',
					bottom: 120,
					left: 120,
					fontFamily: FONT_SANS,
					fontSize: 46,
					fontWeight: 600,
					color: C.textWhite,
				}}
			>
				E este vídeo inteiro
			</div>
		</AbsoluteFill>
	);
};

/** Cena 2: Timeline, Waveform e Partitura Sonora */
const TimelineScene: React.FC<{len: number}> = ({len}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Transição entre 'tempo por palavra' e 'partitura'
	const isPartitura = frame > 65;

	// Posição horizontal do playhead verde (vai de 460px até 1580px)
	const playheadX = interpolate(frame, [0, len], [420, 1600], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Timecode dinâmico no badge verde
	const timeSecond = Math.floor(frame / 30) + 9;
	const timeMillis = Math.floor((frame % 30) * 3.33)
		.toString()
		.padStart(2, '0');
	const timeCodeString = isPartitura ? '01:12:13' : `01:${timeSecond.toString().padStart(2, '0')}:${timeMillis}`;

	// Lista de palavras e suas posições horizontais (px)
	const words = [
		{text: 'Trilha', x: 480, w: 90},
		{text: 'efeito', x: 680, w: 90},
		{text: 'e', x: 860, w: 40},
		{text: 'voz', x: 990, w: 70},
		{text: 'no', x: 1150, w: 50},
		{text: 'mesmo', x: 1280, w: 90},
		{text: 'relógio', x: 1430, w: 110},
	];

	// Efeitos sonoros na pista
	const sfxEvents = [
		{name: 'tick', x: 500},
		{name: 'pop', x: 730},
		{name: 'tick', x: 990},
		{name: 'impact', x: 1430},
	];

	// Barras da waveform de voz (sintetizadas proceduralmente)
	const totalBars = 68;
	const waveStartX = 440;
	const waveWidth = 1180;
	const barSpacing = waveWidth / totalBars;

	const barHeights = React.useMemo(() => {
		const arr: number[] = [];
		for (let i = 0; i < totalBars; i++) {
			const norm = i / totalBars;
			// Variação de volume estilo voz real (picos nas palavras)
			const envelope =
				Math.sin(norm * Math.PI * 4.5) * 0.5 +
				Math.cos(norm * Math.PI * 11) * 0.35 +
				0.45;
			const h = Math.max(6, Math.min(68, Math.abs(envelope) * 64));
			arr.push(h);
		}
		return arr;
	}, [totalBars]);

	// Fade de entrada
	const fadeIn = interpolate(frame, [0, 8], [0, 1], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{opacity: fadeIn}}>
			{/* Top Bar Técnica */}
			<div
				style={{
					position: 'absolute',
					top: 80,
					left: 120,
					right: 120,
					display: 'flex',
					justifyContent: 'space-between',
					fontFamily: FONT_MONO,
					fontSize: 22,
					letterSpacing: '1px',
				}}
			>
				<span style={{color: C.green, fontWeight: 600}}>09 som</span>
				<span style={{color: C.textMuted}}>
					{isPartitura ? 'partitura' : 'tempo por palavra'}
				</span>
			</div>

			{/* Régua de Tempo Superior */}
			<div style={{position: 'absolute', top: 220, left: 120, right: 120}}>
				<div style={{position: 'relative', height: 40}}>
					{[
						{label: '01:09', x: 500},
						{label: '01:10', x: 800},
						{label: '01:11', x: 1100},
						{label: '01:12', x: 1400},
					].map((t) => (
						<div
							key={t.label}
							style={{
								position: 'absolute',
								left: t.x,
								transform: 'translateX(-50%)',
								fontFamily: FONT_MONO,
								fontSize: 18,
								color: C.textMuted,
							}}
						>
							{t.label}
						</div>
					))}
				</div>
			</div>

			{/* ================= PISTA 1: TRILHA ================= */}
			<div style={{position: 'absolute', top: 280, left: 120, right: 120, height: 80}}>
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: 24,
						fontFamily: FONT_MONO,
						fontSize: 22,
						letterSpacing: '2px',
						color: C.textWhite,
						fontWeight: 600,
					}}
				>
					TRILHA
				</div>

				{/* Linha da Trilha */}
				<div
					style={{
						position: 'absolute',
						left: 280,
						right: 0,
						top: 36,
						height: 2,
						backgroundColor: C.trackLine,
					}}
				/>

				{/* Pulsos de batida (ticks verticais) */}
				{[450, 600, 750, 900, 1050, 1200, 1350, 1500].map((bx, idx) => {
					const isPast = playheadX >= bx;
					return (
						<div
							key={idx}
							style={{
								position: 'absolute',
								left: bx,
								top: 20,
								width: 5,
								height: 34,
								backgroundColor: isPast ? C.textWhite : C.rulerTick,
								borderRadius: 2,
							}}
						/>
					);
				})}
			</div>

			{/* ================= PISTA 2: EFEITOS ================= */}
			<div style={{position: 'absolute', top: 430, left: 120, right: 120, height: 80}}>
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: 24,
						fontFamily: FONT_MONO,
						fontSize: 22,
						letterSpacing: '2px',
						color: C.textWhite,
						fontWeight: 600,
					}}
				>
					EFEITOS
				</div>

				{/* Linha de Efeitos */}
				<div
					style={{
						position: 'absolute',
						left: 280,
						right: 0,
						top: 36,
						height: 2,
						backgroundColor: C.trackLine,
					}}
				/>

				{/* Marcadores Diamante de SFX */}
				{sfxEvents.map((sfx, idx) => {
					const isPast = playheadX >= sfx.x;
					return (
						<div
							key={idx}
							style={{
								position: 'absolute',
								left: sfx.x,
								top: 24,
								display: 'flex',
								alignItems: 'center',
								transform: 'translateX(-50%)',
							}}
						>
							{/* Diamante */}
							<div
								style={{
									width: 14,
									height: 14,
									backgroundColor: isPast ? C.textWhite : 'transparent',
									border: `2px solid ${C.textWhite}`,
									transform: 'rotate(45deg)',
									boxShadow: isPast ? '0 0 10px rgba(255,255,255,0.6)' : 'none',
								}}
							/>
							{/* Nome do efeito sonoro */}
							<span
								style={{
									marginLeft: 14,
									fontFamily: FONT_MONO,
									fontSize: 18,
									color: isPast ? C.textWhite : C.textMuted,
								}}
							>
								{sfx.name}
							</span>
						</div>
					);
				})}
			</div>

			{/* ================= PISTA 3: VOZ ================= */}
			<div style={{position: 'absolute', top: 580, left: 120, right: 120, height: 120}}>
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: 34,
						fontFamily: FONT_MONO,
						fontSize: 22,
						letterSpacing: '2px',
						color: C.textWhite,
						fontWeight: 600,
					}}
				>
					VOZ
				</div>

				{/* Linha base horizontal */}
				<div
					style={{
						position: 'absolute',
						left: 280,
						right: 0,
						top: 48,
						height: 2,
						backgroundColor: C.trackLine,
					}}
				/>

				{/* Waveform Símétrica */}
				<div style={{position: 'absolute', left: 0, top: 48}}>
					{barHeights.map((h, i) => {
						const currentX = waveStartX + i * barSpacing;
						const isPast = playheadX >= currentX;
						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									left: currentX,
									top: -h / 2,
									width: 3,
									height: h,
									backgroundColor: isPast ? C.green : '#555A66',
									opacity: isPast ? 0.95 : 0.6,
									borderRadius: 1,
									boxShadow: isPast ? `0 0 6px ${C.greenGlow}` : 'none',
								}}
							/>
						);
					})}
				</div>

				{/* Palavras sincronizadas e colchetes */}
				{words.map((w, idx) => {
					const wordCenter = w.x + w.w / 2;
					const isPast = playheadX >= wordCenter;
					return (
						<div
							key={idx}
							style={{
								position: 'absolute',
								left: w.x,
								top: 0,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								width: w.w,
							}}
						>
							{/* Texto da palavra acima da onda */}
							<span
								style={{
									fontFamily: FONT_MONO,
									fontSize: 18,
									fontWeight: 500,
									color: isPast ? C.textWhite : C.textMuted,
									marginBottom: 58,
								}}
							>
								{w.text}
							</span>
							{/* Barra de duração embaixo */}
							<div
								style={{
									width: '90%',
									height: 3,
									backgroundColor: isPast ? C.textWhite : C.trackLine,
									borderRadius: 2,
								}}
							/>
						</div>
					);
				})}
			</div>

			{/* ================= PLAYHEAD VERDE NEON ================= */}
			<div
				style={{
					position: 'absolute',
					left: playheadX,
					top: 160,
					height: 520,
					transform: 'translateX(-50%)',
					pointerEvents: 'none',
					zIndex: 10,
				}}
			>
				{/* Badge Superior com Timecode */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: '50%',
						transform: 'translateX(-50%)',
						backgroundColor: C.green,
						color: '#000000',
						fontFamily: FONT_MONO,
						fontSize: 18,
						fontWeight: 700,
						padding: '4px 12px',
						borderRadius: 4,
						boxShadow: `0 0 18px ${C.greenGlow}`,
						whiteSpace: 'nowrap',
					}}
				>
					{timeCodeString}
				</div>

				{/* Linha Vertical Neon */}
				<div
					style={{
						position: 'absolute',
						top: 32,
						left: '50%',
						transform: 'translateX(-50%)',
						width: 2.5,
						height: 488,
						backgroundColor: C.green,
						boxShadow: `0 0 10px ${C.green}`,
					}}
				/>

				{/* Colchete / Caliper na cena final (se for partitura) */}
				{isPartitura && (
					<div
						style={{
							position: 'absolute',
							left: -190,
							top: 105,
							height: 390,
							width: 190,
							borderLeft: `2.5px solid ${C.green}`,
							borderTop: `2.5px solid ${C.green}`,
							borderBottom: `2.5px solid ${C.green}`,
							opacity: 0.85,
						}}
					/>
				)}
			</div>

			{/* ================= SUBTÍTULO INFERIOR ================= */}
			<div
				style={{
					position: 'absolute',
					bottom: 120,
					left: 120,
					fontFamily: FONT_SANS,
					fontSize: 48,
					fontWeight: 600,
					color: C.textWhite,
				}}
			>
				Trilha, efeito e voz no{' '}
				<span
					style={{
						color: playheadX > 1400 ? C.green : C.textWhite,
					}}
				>
					relógio.
				</span>
			</div>
		</AbsoluteFill>
	);
};

/** Composição Principal do Exemplo */
export const CustomShowcase: React.FC = () => {
	const lenScene1 = 75; // 2.5 segundos
	const lenScene2 = 120; // 4.0 segundos

	return (
		<AbsoluteFill
			style={{
				backgroundColor: C.bg,
				fontFamily: FONT_SANS,
				overflow: 'hidden',
			}}
		>
			<Sequence durationInFrames={lenScene1}>
				<TerminalScene len={lenScene1} />
			</Sequence>

			<Sequence from={lenScene1} durationInFrames={lenScene2}>
				<TimelineScene len={lenScene2} />
			</Sequence>

			{/* Textura sutil de grão de cinema */}
			<Grain opacity={0.04} />

			{/* Áudio sincronizado do template */}
			<Audio src={staticFile('audio/mix.wav')} />
		</AbsoluteFill>
	);
};
