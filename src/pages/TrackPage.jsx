import { Link, useParams } from 'react-router-dom';
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
import { ArrowRight, CheckCircle, Lock, Sparkles, ArrowLeft } from 'lucide-react';
import { getTrack } from '../data/lessons';
import { isLessonComplete, getLessonProgress, getTrackProgress } from '../data/progress';

// Track color mapping
const trackColors = {
  python: { bg: 'green.50', color: 'green.500', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', ring: 'rgba(34, 197, 94, 0.2)' },
  rust: { bg: 'orange.50', color: 'orange.500', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', ring: 'rgba(249, 115, 22, 0.2)' },
  react: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', ring: 'rgba(14, 165, 233, 0.2)' },
  c: { bg: 'gray.100', color: 'gray.600', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)', ring: 'rgba(100, 116, 139, 0.2)' },
  algebra: { bg: 'purple.50', color: 'purple.500', gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)', ring: 'rgba(168, 85, 247, 0.2)' },
  arithmetic: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', ring: 'rgba(14, 165, 233, 0.2)' },
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
      <Box
        bg="white"
        borderRadius="2xl"
        border="2px solid"
        borderColor={complete ? 'green.200' : 'gray.100'}
        p={5}
        transition="all 0.3s ease"
        _hover={{
          borderColor: complete ? 'green.300' : colors.color,
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${colors.ring}`,
        }}
        position="relative"
        overflow="hidden"
        h="100%"
      >
        {/* NEW badge */}
        {visual.isNew && !complete && (
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
        )}

        {/* Complete badge */}
        {complete && (
          <Flex
            position="absolute"
            top={3}
            right={3}
            w={6}
            h={6}
            borderRadius="full"
            bg="green.100"
            align="center"
            justify="center"
          >
            <CheckCircle size={14} color="#22c55e" />
          </Flex>
        )}

        <VStack align="stretch" gap={4}>
          {/* Icon */}
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
              <Progress.Root value={progress} size="sm">
                <Progress.Track bg="gray.100" borderRadius="full" h="6px">
                  <Progress.Range bg={colors.gradient} borderRadius="full" />
                </Progress.Track>
              </Progress.Root>
              <Text fontSize="xs" color="gray.500" mt={1}>
                {progress}% complete
              </Text>
            </Box>
          )}

          {complete && (
            <Text fontSize="sm" color="green.600" fontWeight="500">
              Completed
            </Text>
          )}
        </VStack>
      </Box>
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
      >
        <Container maxW="6xl">
          {/* Back link */}
          <Link to="/courses">
            <HStack color="gray.500" fontSize="sm" mb={6} _hover={{ color: 'gray.700' }}>
              <ArrowLeft size={16} />
              <Text>All Courses</Text>
            </HStack>
          </Link>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'flex-start', md: 'center' }}
            justify="space-between"
            gap={6}
          >
            <HStack gap={5}>
              <Flex
                w={{ base: 16, md: 20 }}
                h={{ base: 16, md: 20 }}
                borderRadius="2xl"
                bg={colors.bg}
                align="center"
                justify="center"
                fontSize={{ base: '3xl', md: '4xl' }}
                boxShadow={`0 8px 24px ${colors.ring}`}
              >
                {track.icon}
              </Flex>
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

            {/* Progress stats */}
            <Box
              bg="gray.50"
              borderRadius="xl"
              px={6}
              py={4}
              minW="200px"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text color="gray.600" fontSize="sm">Progress</Text>
                <Text fontWeight="700" color="gray.900">{progress}%</Text>
              </Flex>
              <Progress.Root value={progress} size="sm">
                <Progress.Track bg="gray.200" borderRadius="full" h="8px">
                  <Progress.Range bg={colors.gradient} borderRadius="full" />
                </Progress.Track>
              </Progress.Root>
              <Text color="gray.500" fontSize="xs" mt={2}>
                {completedCount} of {allLessons.length} lessons completed
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Course Sections */}
      <Box py={{ base: 8, md: 12 }}>
        <Container maxW="6xl">
          {track.courses.map(course => (
            <Box key={course.id} mb={12}>
              {/* Section header */}
              <Box mb={6}>
                <HStack gap={3} mb={2}>
                  <Flex
                    w={8}
                    h={8}
                    borderRadius="lg"
                    bg={colors.bg}
                    align="center"
                    justify="center"
                    fontSize="lg"
                  >
                    {track.icon}
                  </Flex>
                  <Heading fontSize="xl" fontWeight="700" color="gray.900">
                    {course.title}
                  </Heading>
                </HStack>
                <Text color="gray.600" fontSize="md" ml={11}>
                  {course.subtitle}
                </Text>
              </Box>

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
