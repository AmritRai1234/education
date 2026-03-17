import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Input,
  Progress,
} from '@chakra-ui/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  BookOpen,
  Lightbulb,
  Code,
  Sparkles,
  Trophy,
  Zap,
  Star,
} from 'lucide-react';
import { getTrack, getCourse, getLesson } from '../data/lessons';
import { completeStep, completeLesson, getLevel } from '../data/progress';
import {
  BalanceScale,
  NumberLine,
  CoordinatePlane,
  EquationSteps,
  BlockGroups,
  FractionCircle,
  MultiplicationGrid,
} from '../components/MathVisuals';
import { useAnimations, FadeInUp, Shake, SuccessCheck, SparkleEffect, ProgressRing } from '../components/Animations';

// Track colors
const trackColors = {
  python: { bg: 'green.50', color: 'green.500', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' },
  rust: { bg: 'orange.50', color: 'orange.500', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' },
  react: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' },
  c: { bg: 'gray.100', color: 'gray.600', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' },
  algebra: { bg: 'purple.50', color: 'purple.500', gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)' },
  arithmetic: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' },
};

// Slider components for visual steps
function SliderGraph({ data }) {
  const [slope, setSlope] = useState(data.initialSlope);
  const [intercept, setIntercept] = useState(data.initialIntercept);

  return (
    <Box p={6} bg="gray.50" borderRadius="xl">
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Box flex={1}>
          <CoordinatePlane
            lines={[{ slope, intercept, label: `y = ${slope}x ${intercept >= 0 ? '+' : '-'} ${Math.abs(intercept)}` }]}
            points={[]}
            showGrid={true}
          />
        </Box>
        <VStack flex={1} align="stretch" gap={4}>
          <Text fontWeight="600" color="gray.700">Interactive Controls</Text>
          <Box bg="white" p={4} borderRadius="lg" border="1px solid" borderColor="gray.200">
            <Text fontFamily="mono" fontSize="lg" color="gray.900" mb={4}>
              y = {slope}x {intercept >= 0 ? '+' : '-'} {Math.abs(intercept)}
            </Text>
            <VStack gap={4}>
              <Box w="100%">
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="sm" color="gray.600">Slope (m)</Text>
                  <Text fontSize="sm" fontWeight="600">{slope}</Text>
                </Flex>
                <input
                  type="range"
                  min={data.slopeRange[0]}
                  max={data.slopeRange[1]}
                  step={0.5}
                  value={slope}
                  onChange={(e) => setSlope(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#0ea5e9' }}
                />
              </Box>
              <Box w="100%">
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="sm" color="gray.600">Y-Intercept (b)</Text>
                  <Text fontSize="sm" fontWeight="600">{intercept}</Text>
                </Flex>
                <input
                  type="range"
                  min={data.interceptRange[0]}
                  max={data.interceptRange[1]}
                  step={1}
                  value={intercept}
                  onChange={(e) => setIntercept(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#0ea5e9' }}
                />
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}

function MathSlider({ data }) {
  const [value, setValue] = useState(data.initialValue ?? data.min);

  const computeResult = (v) => {
    if (data.formatResult === 'linear') return data.slope * v + data.intercept;
    if (data.formatResult === 'quadratic') return v * v;
    return v;
  };

  const eqDisplay = data.equation.replace('RESULT', computeResult(value)).replace(data.variable, value);

  return (
    <Box p={6} bg="gray.50" borderRadius="xl">
      <Text fontWeight="600" color="gray.700" mb={4}>Interactive Explorer</Text>
      <Box bg="white" p={6} borderRadius="lg" border="1px solid" borderColor="gray.200">
        <Text fontFamily="mono" fontSize="xl" color="gray.900" mb={6} textAlign="center">
          {eqDisplay}
        </Text>
        <VStack gap={4}>
          <Box w="100%">
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="gray.600">{data.variable} =</Text>
              <Text fontSize="sm" fontWeight="600">{value}</Text>
            </Flex>
            <input
              type="range"
              min={data.min}
              max={data.max}
              step={data.step || 1}
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#0ea5e9' }}
            />
          </Box>
          <Flex
            bg="brand.50"
            px={4}
            py={3}
            borderRadius="lg"
            justify="center"
            w="100%"
          >
            <Text fontSize="lg" fontWeight="700" color="brand.600">
              Result: {computeResult(value)}
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}

function SteppedEquation({ steps }) {
  const [currentEqStep, setCurrentEqStep] = useState(0);

  return (
    <Box p={6} bg="gray.50" borderRadius="xl">
      <Text fontWeight="600" color="gray.700" mb={4}>Step-by-Step Solution</Text>
      <EquationSteps steps={steps} currentStep={currentEqStep} onStep={setCurrentEqStep} />
    </Box>
  );
}

// Code block component
function CodeBlock({ code, output }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        bg="gray.900"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="0 8px 24px rgba(0, 0, 0, 0.1)"
      >
        {/* Header */}
        <Flex bg="gray.800" px={4} py={3} align="center" gap={2}>
          <Flex gap={2}>
            <Box w={3} h={3} borderRadius="full" bg="red.400" />
            <Box w={3} h={3} borderRadius="full" bg="yellow.400" />
            <Box w={3} h={3} borderRadius="full" bg="green.400" />
          </Flex>
        </Flex>
        
        {/* Code */}
        <Box px={6} py={5} fontFamily="mono" fontSize="sm" lineHeight="1.8">
          <pre style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>{code}</pre>
        </Box>

        {/* Output */}
        {output && (
          <Box
            bg="gray.800"
            px={6}
            py={4}
            borderTop="1px solid"
            borderColor="gray.700"
          >
            <Text color="gray.400" fontSize="xs" fontWeight="600" mb={2}>
              OUTPUT
            </Text>
            <Text color="green.400" fontFamily="mono" fontSize="sm">
              {output}
            </Text>
          </Box>
        )}
      </Box>
    </motion.div>
  );
}

// Choice button component with animations
function ChoiceButton({ letter, text, selected, isCorrect, showResult, onClick, index }) {
  let bg = 'white';
  let borderColor = 'gray.200';
  let color = 'gray.700';

  if (selected && showResult) {
    if (isCorrect) {
      bg = 'green.50';
      borderColor = 'green.400';
      color = 'green.700';
    } else {
      bg = 'red.50';
      borderColor = 'red.400';
      color = 'red.700';
    }
  } else if (showResult && isCorrect && !selected) {
    bg = 'green.50';
    borderColor = 'green.300';
    color = 'green.700';
  } else if (selected) {
    bg = 'brand.50';
    borderColor = 'brand.400';
    color = 'brand.700';
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Shake trigger={selected && showResult && !isCorrect}>
        <motion.div
          whileHover={!showResult ? { scale: 1.02, x: 4 } : {}}
          whileTap={!showResult ? { scale: 0.98 } : {}}
        >
          <Button
            onClick={onClick}
            disabled={showResult}
            w="100%"
            h="auto"
            py={4}
            px={5}
            bg={bg}
            border="2px solid"
            borderColor={borderColor}
            borderRadius="xl"
            justifyContent="flex-start"
            textAlign="left"
            whiteSpace="normal"
            _hover={!showResult ? { borderColor: 'brand.400', bg: 'brand.50' } : {}}
            _disabled={{ opacity: 1, cursor: 'default' }}
            transition="all 0.2s"
          >
            <HStack gap={4} w="100%" align="flex-start">
              <motion.div
                animate={selected && showResult && isCorrect ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <Flex
                  w={8}
                  h={8}
                  borderRadius="lg"
                  bg={selected ? (showResult ? (isCorrect ? 'green.400' : 'red.400') : 'brand.500') : 'gray.100'}
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  {showResult && selected ? (
                    isCorrect ? <Check size={16} color="white" /> : <X size={16} color="white" />
                  ) : (
                    <Text fontSize="sm" fontWeight="700" color={selected ? 'white' : 'gray.600'}>
                      {letter}
                    </Text>
                  )}
                </Flex>
              </motion.div>
              <Text fontWeight="500" color={color} flex={1}>
                {text}
              </Text>
            </HStack>
          </Button>
        </motion.div>
      </Shake>
    </motion.div>
  );
}

// XP Reward Badge
function XPRewardBadge({ amount, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -20 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <HStack
            bg="purple.500"
            color="white"
            px={4}
            py={2}
            borderRadius="full"
            boxShadow="0 4px 12px rgba(168, 85, 247, 0.4)"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              <Zap size={18} fill="white" />
            </motion.div>
            <Text fontWeight="700">+{amount} XP</Text>
          </HStack>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main component
export default function LessonViewer() {
  const { trackId, courseId, lessonId } = useParams();
  const { showXPGain, showConfetti, showStreakIncrease, showLevelUp, flashCorrect } = useAnimations();

  const track = getTrack(trackId);
  const course = getCourse(trackId, courseId);
  const lesson = getLesson(trackId, courseId, lessonId);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [fillAnswer, setFillAnswer] = useState('');
  const [fillChecked, setFillChecked] = useState(false);
  const [dragItems, setDragItems] = useState(null);
  const [dragChecked, setDragChecked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showXPBadge, setShowXPBadge] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);

  const colors = track ? (trackColors[track.id] || trackColors.python) : trackColors.python;

  if (!track || !course || !lesson) {
    return (
      <Box py={20} textAlign="center">
        <Container maxW="md">
          <Heading fontSize="2xl" mb={4}>Lesson not found</Heading>
          <Link to="/courses">
            <Button bg="brand.500" color="white" _hover={{ bg: 'brand.600' }}>
              Back to Courses
            </Button>
          </Link>
        </Container>
      </Box>
    );
  }

  const step = lesson.steps[currentStep];
  const totalSteps = lesson.steps.length;
  const isInfoStep = step.type === 'info' || step.type === 'info-visual';
  const progress = ((currentStep + (isCorrect || isInfoStep ? 1 : 0)) / totalSteps) * 100;

  const resetStepState = () => {
    setSelectedChoice(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setFillAnswer('');
    setFillChecked(false);
    setDragItems(null);
    setDragChecked(false);
    setShowXPBadge(false);
  };

  const goNext = () => {
    const result = completeStep(lesson.id, currentStep);
    
    if (result.xpGained > 0) {
      setXpAmount(result.xpGained);
      setShowXPBadge(true);
      setTimeout(() => setShowXPBadge(false), 1500);
    }

    if (currentStep < totalSteps - 1) {
      resetStepState();
      setCurrentStep((prev) => prev + 1);
    } else {
      const lessonResult = completeLesson(lesson.id);
      
      // Show celebration animations
      showConfetti();
      showXPGain(lessonResult.xpGained + (result.xpGained || 0), 'Lesson Complete!');
      
      if (lessonResult.streakIncreased) {
        setTimeout(() => showStreakIncrease(lessonResult.newStreak), 1000);
      }
      
      if (lessonResult.leveledUp) {
        setTimeout(() => showLevelUp(lessonResult.newLevel), 2000);
      }
      
      setCompleted(true);
    }
  };

  const handleChoice = (index) => {
    if (isCorrect !== null) return;
    setSelectedChoice(index);
    const correct = index === step.correctIndex;
    setIsCorrect(correct);
    setShowExplanation(true);
    
    if (correct) {
      flashCorrect();
    }
  };

  const handleFillCheck = () => {
    setFillChecked(true);
    const correct = fillAnswer.trim().toLowerCase() === step.answer.toLowerCase();
    setIsCorrect(correct);
    
    if (correct) {
      flashCorrect();
    }
  };

  const initDrag = () => {
    if (!dragItems && step.type === 'drag-order') {
      const shuffled = [...step.items].sort(() => Math.random() - 0.5);
      setDragItems(shuffled);
    }
  };

  const moveDragItem = (fromIdx, direction) => {
    if (!dragItems) return;
    const toIdx = fromIdx + direction;
    if (toIdx < 0 || toIdx >= dragItems.length) return;
    const newItems = [...dragItems];
    [newItems[fromIdx], newItems[toIdx]] = [newItems[toIdx], newItems[fromIdx]];
    setDragItems(newItems);
  };

  const checkDragOrder = () => {
    if (!dragItems) return;
    const isOrderCorrect = step.correctOrder.every(
      (correctIdx, i) => dragItems[i] === step.items[correctIdx]
    );
    setDragChecked(true);
    setIsCorrect(isOrderCorrect);
    
    if (isOrderCorrect) {
      flashCorrect();
    }
  };

  // Initialize drag items
  if (step.type === 'drag-order' && !dragItems) {
    initDrag();
  }

  // Step badge
  const getStepBadge = () => {
    if (step.type === 'info') return { icon: BookOpen, label: 'Concept', color: 'blue' };
    if (step.type === 'info-visual') return { icon: Sparkles, label: 'Visual', color: 'purple' };
    if (step.type === 'multiple-choice') return { icon: Lightbulb, label: 'Challenge', color: 'orange' };
    if (step.type === 'fill-code') return { icon: Code, label: 'Fill In', color: 'green' };
    if (step.type === 'drag-order') return { icon: Code, label: 'Order', color: 'cyan' };
    return { icon: BookOpen, label: 'Exercise', color: 'gray' };
  };

  const badge = getStepBadge();
  const BadgeIcon = badge.icon;

  // Completion screen
  if (completed) {
    const totalXP = totalSteps * 10 + 50;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Flex
          minH="100vh"
          bg="linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)"
          align="center"
          justify="center"
          p={6}
        >
          <VStack gap={8} textAlign="center" maxW="md">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10, delay: 0.2 }}
            >
              <SparkleEffect active={true}>
                <Flex
                  w={28}
                  h={28}
                  borderRadius="full"
                  bg="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                  align="center"
                  justify="center"
                  boxShadow="0 8px 32px rgba(34, 197, 94, 0.4)"
                >
                  <Trophy size={56} color="white" />
                </Flex>
              </SparkleEffect>
            </motion.div>

            <FadeInUp delay={0.3}>
              <VStack gap={3}>
                <Heading fontSize="3xl" fontWeight="800" color="gray.900">
                  Lesson Complete!
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  You finished <strong>{lesson.title}</strong>
                </Text>
              </VStack>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                    '0 0 40px rgba(168, 85, 247, 0.5)',
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Badge
                  bg="linear-gradient(135deg, #a855f7 0%, #9333ea 100%)"
                  color="white"
                  px={8}
                  py={3}
                  borderRadius="full"
                  fontSize="xl"
                  fontWeight="700"
                >
                  <HStack gap={2}>
                    <Zap size={24} fill="white" />
                    <span>+{totalXP} XP</span>
                  </HStack>
                </Badge>
              </motion.div>
            </FadeInUp>

            <FadeInUp delay={0.7}>
              <HStack gap={4} pt={4}>
                <Link to={`/track/${trackId}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      bg="gray.900"
                      color="white"
                      px={8}
                      h="56px"
                      fontWeight="600"
                      borderRadius="xl"
                      _hover={{ bg: 'gray.800' }}
                      boxShadow="0 4px 14px rgba(0, 0, 0, 0.15)"
                    >
                      <HStack gap={2}>
                        <span>Back to {track.name}</span>
                        <ArrowRight size={18} />
                      </HStack>
                    </Button>
                  </motion.div>
                </Link>
              </HStack>
            </FadeInUp>
          </VStack>
        </Flex>
      </motion.div>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
      {/* Top Bar */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.100"
        position="sticky"
        top={0}
        zIndex={100}
      >
        <Container maxW="4xl" py={3}>
          <Flex align="center" justify="space-between" gap={4}>
            <Link to={`/track/${trackId}`}>
              <motion.div whileHover={{ x: -4 }}>
                <HStack color="gray.500" _hover={{ color: 'gray.700' }}>
                  <ArrowLeft size={18} />
                  <Text fontWeight="500" fontSize="sm" display={{ base: 'none', md: 'block' }}>
                    {track.name}
                  </Text>
                </HStack>
              </motion.div>
            </Link>

            <VStack gap={1} flex={1} maxW="400px">
              <Text fontWeight="600" color="gray.900" fontSize="sm" noOfLines={1}>
                {lesson.title}
              </Text>
              <Box w="100%" position="relative">
                <Progress.Root value={progress} size="xs" w="100%">
                  <Progress.Track bg="gray.100" borderRadius="full" h="6px">
                    <motion.div
                      style={{
                        height: '100%',
                        background: colors.gradient,
                        borderRadius: '9999px',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </Progress.Track>
                </Progress.Root>
              </Box>
            </VStack>

            <HStack gap={3}>
              <XPRewardBadge amount={xpAmount} show={showXPBadge} />
              <Text color="gray.500" fontSize="sm" fontWeight="500">
                {currentStep + 1} / {totalSteps}
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box flex={1} py={{ base: 6, md: 10 }} px={4}>
        <Container maxW="3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <VStack gap={8} align="stretch">
                {/* Step Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <HStack>
                    <Badge
                      bg={`${badge.color}.50`}
                      color={`${badge.color}.600`}
                      px={3}
                      py={1.5}
                      borderRadius="full"
                      fontWeight="600"
                      fontSize="sm"
                    >
                      <HStack gap={1.5}>
                        <BadgeIcon size={14} />
                        <span>{badge.label}</span>
                      </HStack>
                    </Badge>
                  </HStack>
                </motion.div>

                {/* Title & Content */}
                <VStack align="stretch" gap={3}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="700" color="gray.900">
                      {step.title}
                    </Heading>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Text color="gray.600" fontSize="lg" lineHeight="1.7">
                      {step.content}
                    </Text>
                  </motion.div>
                </VStack>

                {/* Visual Steps */}
                {step.type === 'info-visual' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Box>
                      {step.visualType === 'balance-scale' && (
                        <BalanceScale leftItems={step.scaleData.left} rightItems={step.scaleData.right} />
                      )}
                      {step.visualType === 'equation-steps' && (
                        <SteppedEquation steps={step.equationSteps} />
                      )}
                      {step.visualType === 'coordinate-plane' && (
                        <CoordinatePlane
                          lines={step.graphData.lines}
                          points={step.graphData.points}
                          showGrid={step.graphData.showGrid}
                          yRange={step.graphData.yRange}
                        />
                      )}
                      {step.visualType === 'slider' && <MathSlider data={step.sliderData} />}
                      {step.visualType === 'slider-graph' && <SliderGraph data={step.sliderGraphData} />}
                      {step.visualType === 'number-line' && (
                        <NumberLine
                          min={step.numberLineData.min}
                          max={step.numberLineData.max}
                          points={step.numberLineData.points}
                        />
                      )}
                      {step.visualType === 'block-groups' && (
                        <BlockGroups
                          groups={step.blockData.groups}
                          operation={step.blockData.operation}
                          showTotal={step.blockData.showTotal}
                        />
                      )}
                      {step.visualType === 'fraction-circle' && (
                        <FractionCircle
                          numerator={step.fractionData.numerator}
                          denominator={step.fractionData.denominator}
                          color={step.fractionData.color}
                          label={step.fractionData.label}
                        />
                      )}
                      {step.visualType === 'multiplication-grid' && (
                        <MultiplicationGrid
                          rows={step.gridData.rows}
                          cols={step.gridData.cols}
                          color={step.gridData.color}
                          showProduct={step.gridData.showProduct}
                        />
                      )}
                    </Box>
                  </motion.div>
                )}

                {/* Info step with code */}
                {step.type === 'info' && step.visual === 'code' && (
                  <CodeBlock code={step.code} output={step.output} />
                )}

                {/* Multiple Choice */}
                {step.type === 'multiple-choice' && (
                  <VStack gap={3} align="stretch">
                    {step.choices.map((choice, i) => (
                      <ChoiceButton
                        key={i}
                        index={i}
                        letter={String.fromCharCode(65 + i)}
                        text={choice}
                        selected={selectedChoice === i}
                        isCorrect={i === step.correctIndex}
                        showResult={showExplanation}
                        onClick={() => handleChoice(i)}
                      />
                    ))}
                  </VStack>
                )}

                {/* Fill in Code */}
                {step.type === 'fill-code' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Box>
                      <Box
                        bg="gray.900"
                        borderRadius="xl"
                        p={6}
                        fontFamily="mono"
                        mb={4}
                      >
                        <pre style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
                          {step.template.split('___').map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <Input
                                  as="input"
                                  display="inline-block"
                                  w="120px"
                                  mx={1}
                                  px={2}
                                  py={1}
                                  bg={fillChecked ? (isCorrect ? 'green.900' : 'red.900') : 'gray.700'}
                                  color="white"
                                  border="2px solid"
                                  borderColor={fillChecked ? (isCorrect ? 'green.400' : 'red.400') : 'gray.500'}
                                  borderRadius="md"
                                  fontFamily="mono"
                                  fontSize="inherit"
                                  value={fillAnswer}
                                  onChange={(e) => setFillAnswer(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && !fillChecked && handleFillCheck()}
                                  disabled={fillChecked}
                                  autoFocus
                                  _placeholder={{ color: 'gray.400' }}
                                />
                              )}
                            </span>
                          ))}
                        </pre>
                      </Box>
                      {!fillChecked && (
                        <VStack gap={3} align="stretch">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              bg="brand.500"
                              color="white"
                              size="lg"
                              borderRadius="xl"
                              _hover={{ bg: 'brand.600' }}
                              onClick={handleFillCheck}
                              disabled={!fillAnswer.trim()}
                              w="100%"
                            >
                              Check Answer
                            </Button>
                          </motion.div>
                          {step.hint && (
                            <Text color="gray.500" fontSize="sm" textAlign="center">
                              Hint: {step.hint}
                            </Text>
                          )}
                        </VStack>
                      )}
                    </Box>
                  </motion.div>
                )}

                {/* Drag to Order */}
                {step.type === 'drag-order' && dragItems && (
                  <VStack gap={4} align="stretch">
                    <VStack gap={2} align="stretch">
                      {dragItems.map((item, i) => {
                        let itemBg = 'white';
                        let itemBorder = 'gray.200';
                        if (dragChecked) {
                          const isItemCorrect = item === step.items[step.correctOrder[i]];
                          itemBg = isItemCorrect ? 'green.50' : 'red.50';
                          itemBorder = isItemCorrect ? 'green.300' : 'red.300';
                        }
                        return (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            layout
                          >
                            <Flex
                              bg={itemBg}
                              border="2px solid"
                              borderColor={itemBorder}
                              borderRadius="xl"
                              p={4}
                              align="center"
                              gap={4}
                            >
                              <Flex
                                w={8}
                                h={8}
                                borderRadius="lg"
                                bg="gray.100"
                                align="center"
                                justify="center"
                                flexShrink={0}
                              >
                                <Text fontWeight="600" fontSize="sm" color="gray.600">
                                  {i + 1}
                                </Text>
                              </Flex>
                              <Text fontFamily="mono" fontSize="sm" color="gray.800" flex={1}>
                                {item}
                              </Text>
                              {!dragChecked && (
                                <VStack gap={0}>
                                  <Button
                                    size="xs"
                                    variant="ghost"
                                    onClick={() => moveDragItem(i, -1)}
                                    disabled={i === 0}
                                    p={1}
                                  >
                                    <ChevronUp size={16} />
                                  </Button>
                                  <Button
                                    size="xs"
                                    variant="ghost"
                                    onClick={() => moveDragItem(i, 1)}
                                    disabled={i === dragItems.length - 1}
                                    p={1}
                                  >
                                    <ChevronDown size={16} />
                                  </Button>
                                </VStack>
                              )}
                            </Flex>
                          </motion.div>
                        );
                      })}
                    </VStack>
                    {!dragChecked && (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          bg="brand.500"
                          color="white"
                          size="lg"
                          borderRadius="xl"
                          _hover={{ bg: 'brand.600' }}
                          onClick={checkDragOrder}
                          w="100%"
                        >
                          Check Order
                        </Button>
                      </motion.div>
                    )}
                  </VStack>
                )}

                {/* Feedback */}
                <AnimatePresence>
                  {(showExplanation || fillChecked || dragChecked) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 15 }}
                    >
                      <Box
                        bg={isCorrect ? 'green.50' : 'red.50'}
                        border="2px solid"
                        borderColor={isCorrect ? 'green.200' : 'red.200'}
                        borderRadius="xl"
                        p={5}
                      >
                        <HStack mb={2}>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10 }}
                          >
                            {isCorrect ? (
                              <Flex w={6} h={6} borderRadius="full" bg="green.500" align="center" justify="center">
                                <Check size={14} color="white" />
                              </Flex>
                            ) : (
                              <Flex w={6} h={6} borderRadius="full" bg="red.500" align="center" justify="center">
                                <X size={14} color="white" />
                              </Flex>
                            )}
                          </motion.div>
                          <Text fontWeight="700" color={isCorrect ? 'green.700' : 'red.700'}>
                            {isCorrect ? 'Correct!' : 'Not quite!'}
                          </Text>
                          {isCorrect && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Badge bg="purple.100" color="purple.700" px={2} py={0.5} borderRadius="full" fontSize="xs">
                                +10 XP
                              </Badge>
                            </motion.div>
                          )}
                        </HStack>
                        {step.explanation && (
                          <Text color={isCorrect ? 'green.700' : 'red.700'} fontSize="sm">
                            {step.explanation}
                          </Text>
                        )}
                        {fillChecked && !isCorrect && (
                          <Text color="red.700" fontSize="sm">
                            The answer was: <strong>{step.answer}</strong>
                          </Text>
                        )}
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </VStack>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box
        bg="white"
        borderTop="1px solid"
        borderColor="gray.100"
        position="sticky"
        bottom={0}
        py={4}
      >
        <Container maxW="3xl">
          {isInfoStep || isCorrect !== null || fillChecked || dragChecked ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={goNext}
                  bg="gray.900"
                  color="white"
                  size="lg"
                  w="100%"
                  h="56px"
                  fontWeight="600"
                  borderRadius="xl"
                  _hover={{ bg: 'gray.800' }}
                  boxShadow="0 4px 14px rgba(0, 0, 0, 0.1)"
                >
                  <HStack gap={2}>
                    <span>{currentStep < totalSteps - 1 ? 'Continue' : 'Complete Lesson'}</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </HStack>
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <Text textAlign="center" color="gray.500" py={4}>
              Solve the challenge to continue
            </Text>
          )}
        </Container>
      </Box>
    </Box>
  );
}
