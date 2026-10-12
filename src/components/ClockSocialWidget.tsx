import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export type ThemeColors = {
	name: string;
	border1: string;
	border2: string;
	glow: string;
	lensBg: string;
	lensBorder: string;
	analogBg: string;
	pillBg: string;
	pillText: string;
	primaryText: string;
	handHour: string;
	handMinute: string;
	accentDot: string;
};

export const PRESET_THEMES: Record<string, ThemeColors> = {
	skyDream: {
		name: 'Sky Dream',
		border1: 'rgba(255, 255, 255, 0.95)',
		border2: 'rgba(116, 185, 255, 0.85)',
		glow: 'rgba(116, 185, 255, 0.45)',
		lensBg: 'rgba(255, 255, 255, 0.42)',
		lensBorder: 'rgba(255, 255, 255, 0.85)',
		analogBg: 'rgba(224, 242, 254, 0.65)',
		pillBg: 'rgba(168, 216, 255, 0.65)',
		pillText: '#FFFFFF',
		primaryText: '#FFFFFF',
		handHour: '#FFFFFF',
		handMinute: '#60A5FA',
		accentDot: '#38BDF8',
	},
	cottonCandy: {
		name: 'Cotton Candy',
		border1: 'rgba(255, 255, 255, 0.95)',
		border2: 'rgba(255, 170, 190, 0.85)',
		glow: 'rgba(244, 143, 177, 0.45)',
		lensBg: 'rgba(255, 240, 246, 0.45)',
		lensBorder: 'rgba(255, 255, 255, 0.9)',
		analogBg: 'rgba(254, 226, 236, 0.7)',
		pillBg: 'rgba(244, 180, 210, 0.7)',
		pillText: '#FFFFFF',
		primaryText: '#FFFFFF',
		handHour: '#FFFFFF',
		handMinute: '#F472B6',
		accentDot: '#FB7185',
	},
	matchaMint: {
		name: 'Matcha & Mint',
		border1: 'rgba(255, 255, 255, 0.95)',
		border2: 'rgba(110, 231, 183, 0.85)',
		glow: 'rgba(52, 211, 153, 0.42)',
		lensBg: 'rgba(240, 253, 244, 0.45)',
		lensBorder: 'rgba(255, 255, 255, 0.9)',
		analogBg: 'rgba(209, 250, 229, 0.7)',
		pillBg: 'rgba(167, 243, 208, 0.75)',
		pillText: '#FFFFFF',
		primaryText: '#FFFFFF',
		handHour: '#FFFFFF',
		handMinute: '#34D399',
		accentDot: '#10B981',
	},
	deepVelvet: {
		name: 'Deep Velvet (Dark)',
		border1: 'rgba(255, 255, 255, 0.75)',
		border2: 'rgba(56, 189, 248, 0.9)',
		glow: 'rgba(56, 189, 248, 0.55)',
		lensBg: 'rgba(15, 23, 42, 0.82)',
		lensBorder: 'rgba(56, 189, 248, 0.75)',
		analogBg: 'rgba(30, 41, 59, 0.88)',
		pillBg: 'rgba(51, 65, 85, 0.85)',
		pillText: '#E0F2FE',
		primaryText: '#F0F9FF',
		handHour: '#FFFFFF',
		handMinute: '#38BDF8',
		accentDot: '#38BDF8',
	},
};

export const ClockSocialWidget: React.FC<{
	theme?: ThemeColors;
	mode?: 'clock' | 'social';
	socialPlatform?: 'twitch' | 'discord' | 'youtube' | 'kick';
	socialHandle?: string;
	socialSubtitle?: string;
	timeString?: string;
	dateString?: string;
	handMinuteRot?: number;
	handHourRot?: number;
	scale?: number;
	flipProgress?: number; // 0 = frente (clock), 1 = verso/troca
}> = ({
	theme = PRESET_THEMES.skyDream,
	mode = 'clock',
	socialPlatform = 'twitch',
	socialHandle = '@alyxlive',
	socialSubtitle = 'TWITCH • FOLLOW',
	timeString = '07:45',
	dateString = 'PM • TUE 08 OCT',
	handMinuteRot = 270,
	handHourRot = 225,
	scale = 1,
	flipProgress = 0,
}) => {
	const frame = useCurrentFrame();

	// Pérolas orbitando suavemente
	const pearl1X = Math.cos(frame * 0.04) * 35 - 190;
	const pearl1Y = Math.sin(frame * 0.04) * 22 - 70;

	const pearl2X = Math.cos(frame * 0.035 + 2) * 40 + 260;
	const pearl2Y = Math.sin(frame * 0.035 + 2) * 25 + 95;

	const pearl3X = Math.cos(frame * 0.045 + 4) * 28 + 190;
	const pearl3Y = Math.sin(frame * 0.045 + 4) * 20 - 130;

	// Efeito de flip da área de exibição
	const flipDeg = flipProgress * 180;
	const flipScale = 1 - Math.sin(flipProgress * Math.PI) * 0.12;

	return (
		<div
			style={{
				position: 'relative',
				width: 580,
				height: 270,
				transform: `scale(${scale})`,
				transformOrigin: 'center center',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* Pérola Flutuante 1 (Esquerda Alta) */}
			<div
				style={{
					position: 'absolute',
					left: `calc(50% + ${pearl1X}px)`,
					top: `calc(50% + ${pearl1Y}px)`,
					width: 32,
					height: 32,
					borderRadius: '50%',
					background:
						'radial-gradient(circle at 35% 30%, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 35%, rgba(186, 230, 253, 0.5) 70%, rgba(255, 255, 255, 0.2) 100%)',
					boxShadow: '0 8px 20px rgba(116, 185, 255, 0.35), inset 0 1px 2px #FFFFFF',
					zIndex: 10,
					pointerEvents: 'none',
				}}
			/>

			{/* Pérola Flutuante 2 (Direita Baixa) */}
			<div
				style={{
					position: 'absolute',
					left: `calc(50% + ${pearl2X}px)`,
					top: `calc(50% + ${pearl2Y}px)`,
					width: 24,
					height: 24,
					borderRadius: '50%',
					background:
						'radial-gradient(circle at 35% 30%, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 35%, rgba(244, 180, 210, 0.5) 70%, rgba(255, 255, 255, 0.2) 100%)',
					boxShadow: '0 6px 16px rgba(244, 143, 177, 0.35), inset 0 1px 2px #FFFFFF',
					zIndex: 10,
					pointerEvents: 'none',
				}}
			/>

			{/* Pérola Flutuante 3 (Direita Alta) */}
			<div
				style={{
					position: 'absolute',
					left: `calc(50% + ${pearl3X}px)`,
					top: `calc(50% + ${pearl3Y}px)`,
					width: 18,
					height: 18,
					borderRadius: '50%',
					background:
						'radial-gradient(circle at 35% 30%, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 35%, rgba(167, 243, 208, 0.5) 70%, rgba(255, 255, 255, 0.2) 100%)',
					boxShadow: '0 4px 12px rgba(52, 211, 153, 0.35), inset 0 1px 2px #FFFFFF',
					zIndex: 10,
					pointerEvents: 'none',
				}}
			/>

			{/* Container Principal do Widget com Moldura de Vidro */}
			<div
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
					borderRadius: 38,
					background: theme.lensBg,
					backdropFilter: 'blur(20px)',
					border: `2px solid ${theme.border1}`,
					boxShadow: `0 24px 60px ${theme.glow}, inset 0 1px 3px rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(0, 0, 0, 0.05)`,
					padding: '24px 32px',
					display: 'flex',
					alignItems: 'center',
					gap: 28,
				}}
			>
				{/* Relógio Analógico à Esquerda */}
				<div
					style={{
						position: 'relative',
						width: 190,
						height: 190,
						borderRadius: 36,
						background: theme.analogBg,
						border: `1.5px solid ${theme.border1}`,
						boxShadow: 'inset 0 2px 6px rgba(255, 255, 255, 0.8), inset 0 -3px 8px rgba(0, 0, 0, 0.06), 0 10px 25px rgba(0, 0, 0, 0.06)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexShrink: 0,
					}}
				>
					{/* Mostrador com 12 pontos mínimos */}
					{Array.from({length: 12}, (_, i) => {
						const angle = (i * 30 * Math.PI) / 180;
						const r = 70;
						const dotX = Math.sin(angle) * r;
						const dotY = -Math.cos(angle) * r;
						const isMajor = i % 3 === 0;

						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									left: `calc(50% + ${dotX}px)`,
									top: `calc(50% + ${dotY}px)`,
									width: isMajor ? 6 : 4,
									height: isMajor ? 6 : 4,
									borderRadius: '50%',
									background: '#FFFFFF',
									boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
									transform: 'translate(-50%, -50%)',
								}}
							/>
						);
					})}

					{/* Ponteiro das Horas */}
					<div
						style={{
							position: 'absolute',
							width: 5,
							height: 44,
							borderRadius: 3,
							background: theme.handHour,
							boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
							transformOrigin: '50% 100%',
							transform: `translate(-50%, -100%) rotate(${handHourRot}deg)`,
							left: '50%',
							top: '50%',
						}}
					/>

					{/* Ponteiro dos Minutos */}
					<div
						style={{
							position: 'absolute',
							width: 4,
							height: 60,
							borderRadius: 2,
							background: theme.handMinute,
							boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
							transformOrigin: '50% 100%',
							transform: `translate(-50%, -100%) rotate(${handMinuteRot}deg)`,
							left: '50%',
							top: '50%',
						}}
					/>

					{/* Cap Central do Relógio */}
					<div
						style={{
							position: 'absolute',
							width: 14,
							height: 14,
							borderRadius: '50%',
							background: '#FFFFFF',
							border: `2px solid ${theme.handMinute}`,
							boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					/>
				</div>

				{/* Lado Direito: Pílula Superior + Display Digital ou Social */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						transform: `scale(${flipScale})`,
					}}
				>
					{/* Pílula Superior Translúcida (Data / Status / Subtítulo) */}
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 8,
							alignSelf: 'flex-start',
							padding: '6px 18px',
							borderRadius: 20,
							background: theme.pillBg,
							border: '1px solid rgba(255, 255, 255, 0.85)',
							boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.7), 0 4px 12px rgba(0, 0, 0, 0.05)',
							marginBottom: 12,
						}}
					>
						{/* Ponto / Indicador Luminoso */}
						<div
							style={{
								width: 8,
								height: 8,
								borderRadius: '50%',
								background: theme.accentDot,
								boxShadow: `0 0 8px ${theme.accentDot}`,
							}}
						/>
						<span
							style={{
								fontFamily: 'Comfortaa, "Outfit", sans-serif',
								fontSize: 14,
								fontWeight: 700,
								letterSpacing: 1.2,
								color: theme.pillText,
								textShadow: '0 1px 3px rgba(0,0,0,0.1)',
							}}
						>
							{mode === 'clock' ? dateString : socialSubtitle}
						</span>
					</div>

					{/* Display Principal: Relógio Digital ou Social Handle */}
					{mode === 'clock' ? (
						<div
							style={{
								fontFamily: 'Comfortaa, "Fredoka", sans-serif',
								fontSize: 66,
								fontWeight: 800,
								letterSpacing: -1,
								color: theme.primaryText,
								textShadow:
									'0 4px 18px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.1)',
								display: 'flex',
								alignItems: 'baseline',
								gap: 4,
							}}
						>
							<span>{timeString}</span>
						</div>
					) : (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 16,
							}}
						>
							{/* Ícone da Plataforma */}
							<div
								style={{
									width: 52,
									height: 52,
									borderRadius: 16,
									background:
										socialPlatform === 'twitch'
											? '#9146FF'
											: socialPlatform === 'discord'
												? '#5865F2'
												: socialPlatform === 'youtube'
													? '#FF0000'
													: '#53FC18',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
								}}
							>
								{socialPlatform === 'twitch' && (
									<svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF">
										<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
									</svg>
								)}
								{socialPlatform === 'discord' && (
									<svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF">
										<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
									</svg>
								)}
								{socialPlatform === 'youtube' && (
									<svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF">
										<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
									</svg>
								)}
								{socialPlatform === 'kick' && (
									<svg width="26" height="26" viewBox="0 0 24 24" fill="#000000">
										<path d="M3 2h6v7l4-5h6l-6 7 7 11h-6l-5-7v7H3z" />
									</svg>
								)}
							</div>

							<div
								style={{
									fontFamily: 'Comfortaa, "Outfit", sans-serif',
									fontSize: 42,
									fontWeight: 700,
									color: theme.primaryText,
									letterSpacing: -0.5,
									textShadow: '0 2px 8px rgba(0,0,0,0.1)',
								}}
							>
								{socialHandle}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
