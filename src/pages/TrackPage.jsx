import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { ArrowRight, CheckCircle, Lock, Sparkles, ArrowLeft, Trophy, Zap } from 'lucide-react';
import { getTrack } from '../data/lessons';
import { isLessonComplete, getLessonProgress, getTrackProgress } from '../data/progress';
import { FadeInUp, StaggerContainer, StaggerItem, ProgressRing } from '../components/Animations';
import { TrackIcon } from '../components/TrackIcon';

// Track color mapping
const trackColors = {
  python: { bg: 'green.50', color: 'green.500', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', ring: 'rgba(34, 197, 94, 0.2)', hex: '#22c55e' },
  rust: { bg: 'orange.50', color: 'orange.500', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', ring: 'rgba(249, 115, 22, 0.2)', hex: '#f97316' },
  react: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', ring: 'rgba(14, 165, 233, 0.2)', hex: '#0ea5e9' },
  c: { bg: 'gray.100', color: 'gray.600', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)', ring: 'rgba(100, 116, 139, 0.2)', hex: '#64748b' },
  algebra: { bg: 'purple.50', color: 'purple.500', gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)', ring: 'rgba(168, 85, 247, 0.2)', hex: '#a855f7' },
  arithmetic: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', ring: 'rgba(14, 165, 233, 0.2)', hex: '#0ea5e9' },
};

// Lesson card icons based on title keywords
const LESSON_VISUALS = {
  'Visual Equations': { icon: '=', isNew: true },
  'Solving Equations': { icon: 'x', isNew: true },
  'Graphing Lines': { icon: '/', isNew: false },
  'Quadratics': { icon: '^', isNew: true },
  'Hello, World!': { icon: '>', isNew: false },
  'Variables & Types': { icon: '#', isNew: false },
  'Lists & Loops': { icon: '~', isNew: false },
  'If / Else': { icon: '?', isNew: false },
  'Functions': { icon: 'f', isNew: false },
  'Hello, Cargo!': { icon: '!', isNew: false },
  'Ownership': { icon: '&', isNew: false },
  'Types & Structs': { icon: '{', isNew: false },
  'Pattern Matching': { icon: '|', isNew: false },
  'Components': { icon: '<', isNew: false },
  'Props & Data': { icon: ':', isNew: false },
  'State & Hooks': { icon: '@', isNew: false },
  'Hello, C!': { icon: '*', isNew: false },
  'Pointers': { icon: '&', isNew: false },
  'Memory': { icon: 'M', isNew: false },
  'Arrays & Strings': { icon: '[', isNew: false },
  'Number Sense': { icon: '1', isNew: true },
  'Addition & Subtraction': { icon: '+', isNew: true },
  'Multiplication': { icon: 'x', isNew: true },
  'Fractions': { icon: '/', isNew: true },
};

function getLessonVisual(title) {
  return LESSON_VISUALS[title] || { icon: '*', isNew: false };
}

function LessonCard({ track, courseId, lesson, index }) {
  const colors = trackColors[track.id] || trackColors.python;
  const complete = isLessonComplete(lesson.id);
  const progress = getLessonProgress(lesson.id, lesson.steps.length);
  const visual = getLessonVisual(lesson.title);

  return (
    <Link to={`/track/${track.id}/${courseId}/${lesson.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Box
          bg="white"
          borderRadius="2xl"
          border="2px solid"
          borderColor={complete ? 'green.200' : 'gray.100'}
          p={5}
          position="relative"
          overflow="hidden"
          h="100%"
          transition="box-shadow 0.3s ease"
          _hover={{
            boxShadow: `0 12px 24px ${colors.ring}`,
            borderColor: complete ? 'green.300' : colors.color,
          }}
        >
          {/* NEW badge */}
          {visual.isNew && !complete && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.08, type: 'spring' }}
            >
              <Badge
                position="absolute"
                top={3}
                right={3}
                bg="orange.500"
                color="white"
                px={2}
                py={0.5}
                borderRadius="full"
                fontSize="xs"
                fontWeight="700"
              >
                NEW
              </Badge>
            </motion.div>
          )}

          {/* Complete badge */}
          {complete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <Flex
                position="absolute"
                top={3}
                right={3}
                w={7}
                h={7}
                borderRadius="full"
                bg="green.100"
                align="center"
                justify="center"
              >
                <CheckCircle size={16} color="#22c55e" />
              </Flex>
            </motion.div>
          )}

          <VStack align="stretch" gap={4}>
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <Flex
                w={14}
                h={14}
                borderRadius="xl"
                bg={complete ? 'green.50' : colors.bg}
                align="center"
                justify="center"
              >
                <Text
                  fontFamily="mono"
                  fontSize="2xl"
                  fontWeight="800"
                  color={complete ? 'green.500' : colors.color}
                >
                  {visual.icon}
                </Text>
              </Flex>
            </motion.div>

            {/* Title */}
            <Box flex={1}>
              <Text fontWeight="700" color="gray.900" fontSize="md" mb={1}>
                {lesson.title}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {lesson.steps.length} steps
              </Text>
            </Box>

            {/* Progress bar */}
            {progress > 0 && !complete && (
              <Box>
                <Box w="100%" h="6px" bg="gray.100" borderRadius="full" overflow="hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: colors.gradient,
                      borderRadius: '9999px',
                    }}
                  />
                </Box>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {progress}% complete
                </Text>
              </Box>
            )}

            {complete && (
              <HStack>
                <Badge bg="green.100" color="green.700" px={2} py={0.5} borderRadius="full" fontSize="xs">
                  Completed
                </Badge>
                <Badge bg="purple.100" color="purple.700" px={2} py={0.5} borderRadius="full" fontSize="xs">
                  +{lesson.steps.length * 10 + 50} XP
                </Badge>
              </HStack>
            )}
          </VStack>
        </Box>
      </motion.div>
    </Link>
  );
}

export default function TrackPage() {
  const { trackId } = useParams();
  const track = getTrack(trackId);

  if (!track) {
    return (
      <Box py={20} textAlign="center">
        <Container maxW="md">
          <Heading fontSize="2xl" mb={4}>Track not found</Heading>
          <Link to="/courses">
            <Button colorScheme="blue">Back to Courses</Button>
          </Link>
        </Container>
      </Box>
    );
  }

  const colors = trackColors[track.id] || trackColors.python;
  const allLessons = track.courses.flatMap(c => c.lessons);
  const progress = getTrackProgress(track.id, allLessons);
  const completedCount = allLessons.filter(l => isLessonComplete(l.id)).length;

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Header */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.100"
        pt={{ base: 8, md: 12 }}
        pb={{ base: 10, md: 14 }}
        position="relative"
        overflow="hidden"
      >
        {/* Background decoration */}
        <Box
          position="absolute"
          top="-100px"
          right="-100px"
          w="300px"
          h="300px"
          bg={`radial-gradient(circle, ${colors.ring} 0%, transparent 70%)`}
          borderRadius="full"
        />

        <Container maxW="6xl" position="relative">
          {/* Back link */}
          <FadeInUp delay={0}>
            <Link to="/courses">
              <motion.div whileHover={{ x: -4 }}>
                <HStack color="gray.500" fontSize="sm" mb={6} _hover={{ color: 'gray.700' }}>
                  <ArrowLeft size={16} />
                  <Text>All Courses</Text>
                </HStack>
              </motion.div>
            </Link>
          </FadeInUp>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'flex-start', md: 'center' }}
            justify="space-between"
            gap={6}
          >
            <FadeInUp delay={0.1}>
              <HStack gap={5}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Flex
                    w={{ base: 16, md: 20 }}
                    h={{ base: 16, md: 20 }}
                    borderRadius="2xl"
                    bg={colors.bg}
                    align="center"
                    justify="center"
                    boxShadow={`0 8px 24px ${colors.ring}`}
                  >
                    <TrackIcon trackId={track.id} size={40} />
                  </Flex>
                </motion.div>
                <Box>
                  <Heading
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontWeight="800"
                    color="gray.900"
                    mb={1}
                  >
                    {track.name}
                  </Heading>
                  <Text color={colors.color} fontWeight="600" fontSize="md">
                    {track.tagline}
                  </Text>
                </Box>
              </HStack>
            </FadeInUp>

            {/* Progress stats */}
            <FadeInUp delay={0.2}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Box
                  bg="gray.50"
                  borderRadius="xl"
                  px={6}
                  py={4}
                  minW="220px"
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <Flex justify="space-between" align="center" mb={3}>
                    <HStack>
                      <Trophy size={16} color={colors.hex} />
                      <Text color="gray.600" fontSize="sm" fontWeight="500">Progress</Text>
                    </HStack>
                    <Text fontWeight="700" color="gray.900">{progress}%</Text>
                  </Flex>
                  <Box w="100%" h="8px" bg="gray.200" borderRadius="full" overflow="hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                      style={{
                        height: '100%',
                        background: colors.gradient,
                        borderRadius: '9999px',
                      }}
                    />
                  </Box>
                  <Text color="gray.500" fontSize="xs" mt={2}>
                    {completedCount} of {allLessons.length} lessons completed
                  </Text>
                </Box>
              </motion.div>
            </FadeInUp>
          </Flex>
        </Container>
      </Box>

      {/* Course Sections */}
      <Box py={{ base: 8, md: 12 }}>
        <Container maxW="6xl">
          {track.courses.map((course, courseIndex) => (
            <Box key={course.id} mb={12}>
              {/* Section header */}
              <FadeInUp delay={0.1 * courseIndex}>
                <Box mb={6}>
                  <HStack gap={3} mb={2}>
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Flex
                        w={8}
                        h={8}
                        borderRadius="lg"
                        bg={colors.bg}
                        align="center"
                        justify="center"
                      >
                        <TrackIcon trackId={track.id} size={20} />
                      </Flex>
                    </motion.div>
                    <Heading fontSize="xl" fontWeight="700" color="gray.900">
                      {course.title}
                    </Heading>
                  </HStack>
                  <Text color="gray.600" fontSize="md" ml={11}>
                    {course.subtitle}
                  </Text>
                </Box>
              </FadeInUp>

              {/* Lesson cards grid */}
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={5}>
                {course.lessons.map((lesson, i) => (
                  <LessonCard
                    key={lesson.id}
                    track={track}
                    courseId={course.id}
                    lesson={lesson}
                    index={i}
                  />
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
}
