import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react';
import { Zap, Flame, Trophy, Star, Sparkles, CheckCircle, TrendingUp } from 'lucide-react';

// ============================================
// CONTEXT FOR GLOBAL ANIMATIONS
// ============================================
const AnimationContext = createContext(null);

export function AnimationProvider({ children }) {
  const [xpPopup, setXpPopup] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [streakPopup, setStreakPopup] = useState(null);
  const [levelUp, setLevelUp] = useState(null);
  const [correctFlash, setCorrectFlash] = useState(false);

  const showXPGain = useCallback((amount, label) => {
    setXpPopup({ amount, label, key: Date.now() });
    setTimeout(() => setXpPopup(null), 2000);
  }, []);

  const showConfetti = useCallback(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  }, []);

  const showStreakIncrease = useCallback((count) => {
    setStreakPopup({ count, key: Date.now() });
    setTimeout(() => setStreakPopup(null), 2500);
  }, []);

  const showLevelUp = useCallback((level) => {
    setLevelUp({ level, key: Date.now() });
    setTimeout(() => setLevelUp(null), 3000);
  }, []);

  const flashCorrect = useCallback(() => {
    setCorrectFlash(true);
    setTimeout(() => setCorrectFlash(false), 500);
  }, []);

  return (
    <AnimationContext.Provider value={{ 
      showXPGain, 
      showConfetti, 
      showStreakIncrease, 
      showLevelUp,
      flashCorrect,
    }}>
      {children}
      
      {/* XP Popup */}
      <AnimatePresence>
        {xpPopup && (
          <motion.div
            key={xpPopup.key}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
            }}
          >
            <XPBadge amount={xpPopup.amount} label={xpPopup.label} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {confetti && <Confetti />}
      </AnimatePresence>

      {/* Streak Popup */}
      <AnimatePresence>
        {streakPopup && (
          <motion.div
            key={streakPopup.key}
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            style={{
              position: 'fixed',
              top: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
            }}
          >
            <StreakBadge count={streakPopup.count} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up */}
      <AnimatePresence>
        {levelUp && (
          <motion.div
            key={levelUp.key}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          >
            <LevelUpModal level={levelUp.level} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Correct Answer Flash */}
      <AnimatePresence>
        {correctFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              pointerEvents: 'none',
              zIndex: 9998,
            }}
          />
        )}
      </AnimatePresence>
    </AnimationContext.Provider>
  );
}

export function useAnimations() {
  const ctx = useContext(AnimationContext);
  if (!ctx) {
    return {
      showXPGain: () => {},
      showConfetti: () => {},
      showStreakIncrease: () => {},
      showLevelUp: () => {},
      flashCorrect: () => {},
    };
  }
  return ctx;
}

// ============================================
// XP BADGE COMPONENT
// ============================================
function XPBadge({ amount, label }) {
  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 20px rgba(168, 85, 247, 0.3)',
          '0 0 40px rgba(168, 85, 247, 0.5)',
          '0 0 20px rgba(168, 85, 247, 0.3)',
        ],
      }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <Flex
        bg="linear-gradient(135deg, #a855f7 0%, #9333ea 100%)"
        px={6}
        py={3}
        borderRadius="full"
        align="center"
        gap={3}
        boxShadow="0 8px 32px rgba(168, 85, 247, 0.4)"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          <Zap size={24} color="white" fill="white" />
        </motion.div>
        <VStack gap={0} align="flex-start">
          <Text color="white" fontWeight="800" fontSize="xl">
            +{amount} XP
          </Text>
          {label && (
            <Text color="purple.200" fontSize="sm" fontWeight="500">
              {label}
            </Text>
          )}
        </VStack>
      </Flex>
    </motion.div>
  );
}

// ============================================
// STREAK BADGE COMPONENT
// ============================================
function StreakBadge({ count }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 0.5, repeat: 3 }}
    >
      <Flex
        bg="linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
        px={8}
        py={4}
        borderRadius="2xl"
        align="center"
        gap={4}
        boxShadow="0 8px 32px rgba(249, 115, 22, 0.4)"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6, repeat: 2 }}
        >
          <Flame size={32} color="white" fill="white" />
        </motion.div>
        <VStack gap={0} align="flex-start">
          <Text color="orange.100" fontSize="sm" fontWeight="600">
            Streak
          </Text>
          <Text color="white" fontWeight="800" fontSize="2xl">
            {count} Days
          </Text>
        </VStack>
      </Flex>
    </motion.div>
  );
}

// ============================================
// LEVEL UP MODAL
// ============================================
function LevelUpModal({ level }) {
  return (
    <motion.div
      initial={{ rotateY: 90 }}
      animate={{ rotateY: 0 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      <Box
        bg="white"
        borderRadius="3xl"
        p={10}
        textAlign="center"
        boxShadow="0 25px 80px rgba(0,0,0,0.3)"
        maxW="400px"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Flex
            w={24}
            h={24}
            mx="auto"
            mb={6}
            borderRadius="full"
            bg="linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
            align="center"
            justify="center"
            boxShadow="0 8px 32px rgba(251, 191, 36, 0.5)"
          >
            <Trophy size={48} color="white" />
          </Flex>
        </motion.div>
        <Text color="gray.500" fontSize="lg" fontWeight="600" mb={2}>
          Congratulations!
        </Text>
        <Text color="gray.900" fontSize="3xl" fontWeight="800" mb={4}>
          Level {level}
        </Text>
        <Text color="gray.500" fontSize="md">
          Keep going to unlock more achievements!
        </Text>
      </Box>
    </motion.div>
  );
}

// ============================================
// CONFETTI COMPONENT
// ============================================
function Confetti() {
  const colors = ['#22c55e', '#0ea5e9', '#a855f7', '#f97316', '#ec4899', '#eab308'];
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 8 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <Box position="fixed" inset={0} pointerEvents="none" zIndex={9999} overflow="hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: -20,
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: '110vh',
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </Box>
  );
}

// ============================================
// ANIMATED COUNTER
// ============================================
export function AnimatedCounter({ value, duration = 1 }) {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [display]);

  return <span>{displayValue}</span>;
}

// ============================================
// FADE IN UP ANIMATION
// ============================================
export function FadeInUp({ children, delay = 0, duration = 0.5, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// STAGGER CONTAINER
// ============================================
export function StaggerContainer({ children, staggerDelay = 0.1, ...props }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SCALE IN ANIMATION
// ============================================
export function ScaleIn({ children, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PULSE ANIMATION
// ============================================
export function Pulse({ children, ...props }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SHAKE ANIMATION (for wrong answers)
// ============================================
export function Shake({ trigger, children }) {
  return (
    <motion.div
      animate={trigger ? {
        x: [0, -10, 10, -10, 10, 0],
      } : {}}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SUCCESS CHECKMARK ANIMATION
// ============================================
export function SuccessCheck({ size = 48 }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', damping: 10, stiffness: 100 }}
    >
      <Flex
        w={`${size}px`}
        h={`${size}px`}
        borderRadius="full"
        bg="green.500"
        align="center"
        justify="center"
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <CheckCircle size={size * 0.6} color="white" />
        </motion.div>
      </Flex>
    </motion.div>
  );
}

// ============================================
// FLOATING ANIMATION
// ============================================
export function Float({ children, amplitude = 8, duration = 3, ...props }) {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PROGRESS RING
// ============================================
export function ProgressRing({ progress, size = 60, strokeWidth = 6, color = '#22c55e' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <motion.circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          strokeDasharray: circumference,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
    </svg>
  );
}

// ============================================
// SPARKLE EFFECT
// ============================================
export function SparkleEffect({ active, children }) {
  const sparkles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    angle: (i / 6) * 360,
    delay: i * 0.1,
  }));

  return (
    <Box position="relative" display="inline-block">
      {children}
      <AnimatePresence>
        {active && sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              x: Math.cos(sparkle.angle * Math.PI / 180) * 30,
              y: Math.sin(sparkle.angle * Math.PI / 180) * 30,
            }}
            transition={{ 
              duration: 0.6, 
              delay: sparkle.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              pointerEvents: 'none',
            }}
          >
            <Sparkles size={12} color="#fbbf24" />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}
