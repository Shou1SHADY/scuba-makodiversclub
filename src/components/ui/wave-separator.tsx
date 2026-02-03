import React from 'react';

interface Props {
    position?: 'top' | 'bottom';
    color?: string; // Tailwind text color class, e.g., 'text-white' or 'text-navy'
    height?: string;
    flip?: boolean;
}

const WaveSeparator: React.FC<Props> = ({
    position = 'bottom',
    color = 'text-white',
    height = 'h-16 md:h-24',
    flip = false
}) => {
    // SVG path is designed as "Fill Bottom".
    // It draws the wave and fills everything BELOW it to the bottom edge.

    // position="bottom": No rotation. Fills from bottom edge up to wave. 
    // (Correct for transitioning from Image -> Solid Color below)

    // position="top": Rotate 180. Fills from top edge down to wave.
    // (Correct for transitioning from Solid Color above -> Image)

    const rotationClass = position === 'top' ? 'rotate-180' : '';
    const flipClass = flip ? 'scale-x-[-1]' : '';

    return (
        <div className={`absolute left-0 w-full overflow-hidden leading-[0] z-20 ${position === 'bottom' ? 'bottom-0' : 'top-0'} pointer-events-none`}>
            <svg
                className={`relative block w-[calc(100%+1.3px)] ${height} ${color} ${rotationClass} ${flipClass}`}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                fill="currentColor"
            >
                <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128V320H0Z"></path>
            </svg>
        </div>
    );
};

export default WaveSeparator;
