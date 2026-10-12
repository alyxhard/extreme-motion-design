import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {springs} from '../lib/motion';

/**
 * Elementos de Marca & Pills inspirados fielmente no material de venda:
 * - Cabeçalho: "ClockSocial Time v1" com pins cintilantes
 * - Pílula única de subtítulo / destaque sem poluição visual
 * - Pills de recursos: "Custom colors", "Social Midias", "Clock time", "Custom Images"
 * - Assinatura Alyx Overlays Widgets
 */
export const HeaderTitle: React.FC<{
	subtitle?: string;
	tagDotColor?: string;
	fontFamily?: string;
}> = ({
	subtitle = 'Dual Clock • Analog & Digital',
	tagDotColor,
	fontFamily = 'Comfortaa',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const inSpring = spring({
		frame,
		fps,
		config: springs.smooth,
		durationInFrames: 18,
	});

	const pinPulse = Math.sin(frame * 0.1) * 3;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				transform: `translateY(${(1 - inSpring) * -20}px)`,
				opacity: inSpring,
				pointerEvents: 'none',
				width: '100%',
			}}
		>
			{/* Tag superior de categoria */}
			<div
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					gap: 6,
					padding: '4px 16px',
					borderRadius: 16,
					background: 'rgba(255, 255, 255, 0.45)',
					border: '1px solid rgba(255, 255, 255, 0.9)',
					boxShadow: '0 4px 12px rgba(116, 185, 255, 0.25)',
					marginBottom: 10,
				}}
			>
				<span
					style={{
						fontFamily,
						fontSize: 12,
						fontWeight: 700,
						color: '#2563EB',
						letterSpacing: 2,
						textTransform: 'uppercase',
					}}
				>
					Stream Overlay Widget
				</span>
			</div>

			{/* Linha 1: ClockSocial */}
			<div
				style={{
					fontFamily,
					fontSize: 66,
					fontWeight: 700,
					color: '#FFFFFF',
					textShadow:
						'0 4px 20px rgba(116, 185, 255, 0.7), 0 2px 4px rgba(0, 0, 0, 0.1)',
					letterSpacing: -0.5,
					lineHeight: 1.05,
				}}
			>
				ClockSocial
			</div>

			{/* Linha 2: Time v1 com alfinetes/sparkles */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 12,
					fontFamily,
					fontSize: 54,
					fontWeight: 700,
					lineHeight: 1.1,
					marginBottom: 14,
				}}
			>
				{/* Pin cintilante à esquerda */}
				<div
					style={{
						transform: `translateY(${pinPulse}px) rotate(-15deg)`,
						display: 'inline-block',
					}}
				>
					<svg width="22" height="22" viewBox="0 0 24 24" fill="#93C5FD">
						<path d="M12 2l2.4 6.6 6.6 2.4-6.6 2.4-2.4 6.6-2.4-6.6-6.6-2.4 6.6-2.4z" />
					</svg>
				</div>

				<span
					style={{
						color: '#FFFFFF',
						textShadow: '0 4px 16px rgba(116, 185, 255, 0.6)',
					}}
				>
					Time
				</span>

				<span
					style={{
						color: '#FF6584',
						textShadow: '0 4px 18px rgba(255, 101, 132, 0.55)',
						fontStyle: 'italic',
						marginLeft: 2,
					}}
				>
					v1
				</span>

				{/* Pin cintilante à direita */}
				<div
					style={{
						transform: `translateY(${-pinPulse}px) rotate(15deg)`,
						display: 'inline-block',
					}}
				>
					<svg width="22" height="22" viewBox="0 0 24 24" fill="#F472B6">
						<path d="M12 2l2.4 6.6 6.6 2.4-6.6 2.4-2.4 6.6-2.4-6.6-6.6-2.4 6.6-2.4z" />
					</svg>
				</div>
			</div>

			{/* Subtítulo único em pílula de vidro (sem poluição) */}
			{subtitle && (
				<div
					style={{
						fontFamily,
						fontSize: 16,
						fontWeight: 700,
						color: '#1E3A8A',
						letterSpacing: 0.4,
						background: 'rgba(255, 255, 255, 0.75)',
						padding: '6px 20px',
						borderRadius: 18,
						border: '1.5px solid #FFFFFF',
						boxShadow: '0 4px 14px rgba(116, 185, 255, 0.25)',
						display: 'inline-flex',
						alignItems: 'center',
						gap: 8,
					}}
				>
					{tagDotColor && (
						<div
							style={{
								width: 9,
								height: 9,
								borderRadius: '50%',
								background: tagDotColor,
								boxShadow: `0 0 8px ${tagDotColor}`,
							}}
						/>
					)}
					<span>{subtitle}</span>
				</div>
			)}
		</div>
	);
};

export const FeaturePill: React.FC<{
	label: string;
	active?: boolean;
	fontFamily?: string;
}> = ({label, active = false, fontFamily = 'Comfortaa'}) => {
	const bg = active
		? 'rgba(255, 175, 204, 0.9)'
		: 'rgba(255, 255, 255, 0.55)';
	const border = active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)';
	const textColor = active ? '#FFFFFF' : '#1D4ED8';
	const scale = active ? 1.05 : 1.0;

	return (
		<div
			style={{
				padding: '10px 22px',
				borderRadius: 22,
				background: bg,
				border: `1.5px solid ${border}`,
				boxShadow: active
					? '0 6px 18px rgba(244, 114, 182, 0.45), inset 0 1px 2px #FFFFFF'
					: '0 6px 16px rgba(116, 185, 255, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
				transform: `scale(${scale})`,
				transformOrigin: 'center center',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<span
				style={{
					fontFamily,
					fontSize: 17,
					fontWeight: 700,
					color: textColor,
					letterSpacing: 0.2,
					textShadow: active
						? '0 1px 3px rgba(0,0,0,0.1)'
						: '0 1px 2px rgba(255,255,255,0.8)',
				}}
			>
				{label}
			</span>
		</div>
	);
};

export const AlyxBrandFooter: React.FC<{
	activePillIndex?: number;
	fontFamily?: string;
}> = ({activePillIndex = -1, fontFamily = 'Comfortaa'}) => {
	const frame = useCurrentFrame();

	const pills = [
		'Custom colors',
		'Social Midias',
		'Clock time',
		'Custom Images',
	];

	return (
		<div
			style={{
				position: 'absolute',
				bottom: 60,
				left: 80,
				right: 80,
				display: 'flex',
				alignItems: 'flex-end',
				justifyContent: 'space-between',
			}}
		>
			{/* Grid dos 4 Pills de Recursos do material de venda */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(2, auto)',
					gap: 12,
					alignItems: 'center',
				}}
			>
				{pills.map((p, i) => (
					<FeaturePill
						key={i}
						label={p}
						active={i === activePillIndex || activePillIndex === 99}
						fontFamily={fontFamily}
					/>
				))}
			</div>

			{/* Assinatura Alyx Overlays Widgets */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 14,
					marginLeft: 'auto',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end',
					}}
				>
					<div
						style={{
							fontFamily,
							fontSize: 34,
							fontWeight: 700,
							color: '#FFFFFF',
							textShadow: '0 2px 10px rgba(116, 185, 255, 0.7)',
							display: 'flex',
							alignItems: 'center',
							gap: 5,
						}}
					>
						<span>Alyx</span>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="#93C5FD">
							<path d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z" />
						</svg>
					</div>
					<div
						style={{
							fontFamily,
							fontSize: 10,
							fontWeight: 700,
							letterSpacing: 2,
							color: '#1E3A8A',
							textTransform: 'uppercase',
						}}
					>
						OVERLAYS WIDGETS
					</div>
				</div>

				{/* Ícone Squircle Alyx Glass */}
				<div
					style={{
						width: 58,
						height: 58,
						borderRadius: 18,
						background:
							'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(186, 230, 253, 0.7) 100%)',
						border: '2px solid #FFFFFF',
						boxShadow:
							'0 8px 22px rgba(116, 185, 255, 0.4), inset 0 1px 2px #FFFFFF',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `rotate(${Math.sin(frame * 0.05) * 4}deg)`,
					}}
				>
					<span
						style={{
							fontFamily,
							fontSize: 16,
							fontWeight: 700,
							color: '#2563EB',
						}}
					>
						Alyx
					</span>
				</div>
			</div>
		</div>
	);
};
