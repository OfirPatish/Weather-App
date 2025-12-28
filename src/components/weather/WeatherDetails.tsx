import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "motion/react";
import {
  WiThermometer,
  WiStrongWind,
  WiHumidity,
  WiBarometer,
} from "react-icons/wi";
import { IoEyeOutline } from "react-icons/io5";
import { WeatherData } from "../../types/weather";
import { useEffect, useState } from "react";
import {
  statCardVariants,
  statIconVariants,
  statValueVariants,
  statLabelVariants,
  windDirectionVariants,
  containerFade,
  cardHoverSpring,
  backgroundGradientFade,
  shineEffect,
  transitions,
} from "../../utils/animations";

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

const getWindDirection = (deg?: number): string => {
  if (deg === undefined) return "N/A";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  unit: string;
  color: string;
  bgColor: string;
  index: number;
  windDirection?: string;
}

const AnimatedNumber = ({
  value,
  decimals = 0,
  delay = 0,
}: {
  value: number;
  decimals?: number;
  delay?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (latest) => {
          setDisplayValue(Number(latest.toFixed(decimals)));
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, decimals, delay]);

  return <span>{displayValue}</span>;
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  unit,
  color,
  bgColor,
  index,
  windDirection,
}: StatCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    x.set(mouseX / (rect.width / 2));
    y.set(mouseY / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={statCardVariants}
      initial="initial"
      animate="animate"
      transition={{
        ...transitions.springCard,
        delay: index * 0.1,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={cardHoverSpring}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-base-100 to-base-200/50 p-6 shadow-lg border border-base-300/50 backdrop-blur-sm"
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={backgroundGradientFade.transition}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 items-center text-center">
        {/* Icon */}
        <motion.div
          variants={statIconVariants}
          initial="initial"
          animate={isHovered ? "hover" : "animate"}
          transition={{
            ...transitions.springIcon,
            delay: index * 0.1 + 0.2,
          }}
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${bgColor} ${color} shadow-md`}
        >
          <Icon className="text-3xl" />
        </motion.div>

        {/* Label */}
        <motion.div
          variants={statLabelVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: index * 0.1 + 0.15,
          }}
          className="text-xs font-semibold uppercase tracking-wider text-base-content/60"
        >
          {label}
        </motion.div>

        {/* Value */}
        <motion.div
          variants={statValueVariants}
          initial="initial"
          animate="animate"
          transition={{
            ...transitions.springCard,
            delay: index * 0.1 + 0.3,
          }}
          className="flex items-baseline gap-2 justify-center"
        >
          <span className="text-4xl sm:text-5xl font-bold text-base-content leading-none">
            <AnimatedNumber
              value={value}
              decimals={label === "Visibility" ? 1 : 0}
              delay={index * 0.1 + 0.4}
            />
          </span>
          <span className="text-lg sm:text-xl font-medium text-base-content/70">
            {unit}
            {windDirection && (
              <motion.span
                variants={windDirectionVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 + 0.5 }}
                className="ml-1 text-sm"
              >
                {windDirection}
              </motion.span>
            )}
          </span>
        </motion.div>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        animate={{
          x: isHovered ? "200%" : shineEffect.x,
        }}
        transition={shineEffect.transition}
      />
    </motion.div>
  );
};

export function WeatherDetails({ weatherData }: WeatherDetailsProps) {
  // Defensive checks
  if (!weatherData.main || !weatherData.wind) {
    return null;
  }

  const stats = [
    ...(weatherData.main.feels_like !== undefined
      ? [
          {
            icon: WiThermometer,
            label: "Feels like",
            value: Math.round(weatherData.main.feels_like),
            unit: "°C",
            color: "text-error",
            bgColor: "bg-error/20",
            index: 0,
          },
        ]
      : []),
    ...(weatherData.wind?.speed !== undefined
      ? [
          {
            icon: WiStrongWind,
            label: "Wind Speed",
            value: weatherData.wind.speed,
            unit: "m/s",
            windDirection: weatherData.wind.deg
              ? getWindDirection(weatherData.wind.deg)
              : undefined,
            color: "text-info",
            bgColor: "bg-info/20",
            index: 1,
          },
        ]
      : []),
    ...(weatherData.main.humidity !== undefined
      ? [
          {
            icon: WiHumidity,
            label: "Humidity",
            value: weatherData.main.humidity,
            unit: "%",
            color: "text-success",
            bgColor: "bg-success/20",
            index: 2,
          },
        ]
      : []),
    ...(weatherData.main.pressure !== undefined
      ? [
          {
            icon: WiBarometer,
            label: "Pressure",
            value: weatherData.main.pressure,
            unit: "hPa",
            color: "text-warning",
            bgColor: "bg-warning/20",
            index: 3,
          },
        ]
      : []),
    ...(weatherData.visibility !== undefined && weatherData.visibility > 0
      ? [
          {
            icon: IoEyeOutline,
            label: "Visibility",
            value: weatherData.visibility / 1000,
            unit: "km",
            color: "text-secondary",
            bgColor: "bg-secondary/20",
            index: 4,
          },
        ]
      : []),
  ];

  if (stats.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={containerFade}
      initial="initial"
      animate="animate"
      transition={transitions.normal}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </motion.div>
  );
}
