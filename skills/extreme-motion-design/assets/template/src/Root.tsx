import React from 'react';
import {Composition} from 'remotion';
import timeline from '../public/timeline.json';
import {Showcase} from './scenes/Showcase';
import {CustomShowcase} from './scenes/CustomShowcase';

export const RemotionRoot: React.FC = () => (
	<>
		<Composition
			id="Exemplo-Referencia"
			component={CustomShowcase}
			durationInFrames={195} // 6.5s a 30fps
			fps={30}
			width={1920}
			height={1080}
		/>
		<Composition
			id="Showcase"
			component={Showcase}
			durationInFrames={Math.round(timeline.duration * timeline.fps)}
			fps={timeline.fps}
			width={timeline.width}
			height={timeline.height}
		/>
	</>
);
