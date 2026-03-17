import { Link } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import { getAllTracks } from '../data/lessons';
import { getTrackProgress, isLessonComplete, getLessonProgress } from '../data/progress';

// Track color mapping
const trackColors = {
  python: { bg: 'green.50', color: 'green.500', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' },
  rust: { bg: 'orange.50', color: 'orange.500', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' },
  react: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' },
  c: { bg: 'gray.100', color: 'gray.600', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' },
  algebra: { bg: 'purple.50', color: 'purple.500', gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)' },
  arithmetic: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' },
};

function LessonCard({ track, courseId, lesson, index }) {
  const colors = trackColors[track.id] || trackColors.python;
  const complete = isLessonComplete(lesson.id);
  const progress = getLessonProgress(lesson.id, lesson.steps.length);

  return (
    <Link to={`/track/${track.id}/${courseId}/${lesson.id}`}>
      <Flex
        bg="white"
        borderRadius="xl"
        border="1px solid"
        borderColor={complete ? 'green.200' : 'gray.100'}
        p={4}
        align="center"
        gap={4}
        transition="all 0.2s ease"
        _hover={{
          borderColor: complete ? 'green.300' : colors.color,
          transform: 'translateX(4px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
        position="relative"
        overflow="hidden"
      >
        {/* Progress indicator bar */}
        {progress > 0 && !complete && (
          <Box
            position="absolute"
            bottom={0}
            left={0}
            h="3px"
            w={`${progress}%`}
            bg={colors.gradient}
            borderRadius="full"
          />
        )}

        {/* Lesson number */}
        <Flex
          w={10}
          h={10}
          borderRadius="lg"
          bg={complete ? 'green.50' : colors.bg}
          align="center"
          justify="center"
          flexShrink={0}
        >
          {complete ? (
            <CheckCircle size={20} color="#22c55e" />
          ) : (
            <Text fontWeight="700" fontSize="sm" color={colors.color}>
              {index + 1}
            </Text>
          )}
        </Flex>

        {/* Lesson info */}
        <Box flex={1}>
          <Text fontWeight="600" color="gray.900" fontSize="sm" noOfLines={1}>
            {lesson.title}
          </Text>
          <Text color="gray.500" fontSize="xs" mt={0.5}>
            {lesson.steps.length} steps
          </Text>
        </Box>

        {/* Arrow */}
        <ArrowRight size={16} color="#9ca3af" />
      </Flex>
    </Link>
  );
}

function CourseSection({ track, course }) {
  const colors = trackColors[track.id] || trackColors.python;

  return (
    <Box mb={6}>
      <Heading fontSize="md" fontWeight="600" color="gray.700" mb={4}>
        {course.title}
      </Heading>
      <Text color="gray.500" fontSize="sm" mb={4}>
        {course.subtitle}
      </Text>
      <VStack gap={3} align="stretch">
        {course.lessons.map((lesson, i) => (
          <LessonCard
            key={lesson.id}
            track={track}
            courseId={course.id}
            lesson={lesson}
            index={i}
          />
        ))}
      </VStack>
    </Box>
  );
}

function TrackSection({ track }) {
  const colors = trackColors[track.id] || trackColors.python;
  const allLessons = track.courses.flatMap(c => c.lessons);
  const progress = getTrackProgress(track.id, allLessons);

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.100"
      overflow="hidden"
      mb={8}
    >
      {/* Track Header */}
      <Box bg="gray.50" p={6} borderBottom="1px solid" borderColor="gray.100">
        <Flex align="flex-start" justify="space-between" flexWrap="wrap" gap={4}>
          <Flex align="center" gap={4}>
            <Flex
              w={14}
              h={14}
              borderRadius="xl"
              bg={colors.bg}
              align="center"
              justify="center"
              fontSize="2xl"
            >
              {track.icon}
            </Flex>
            <Box>
              <Heading fontSize="xl" fontWeight="700" color="gray.900" mb={1}>
                {track.name}
              </Heading>
              <Text color={colors.color} fontSize="sm" fontWeight="500">
                {track.tagline}
              </Text>
            </Box>
          </Flex>

          {/* Progress */}
          {progress > 0 && (
            <Flex align="center" gap={3} bg="white" px={4} py={2} borderRadius="full" border="1px solid" borderColor="gray.200">
              <Box w="100px">
                <Progress.Root value={progress} size="sm">
                  <Progress.Track bg="gray.100" borderRadius="full">
                    <Progress.Range bg={colors.gradient} borderRadius="full" />
                  </Progress.Track>
                </Progress.Root>
              </Box>
              <Text fontSize="sm" fontWeight="600" color="gray.700">
                {progress}%
              </Text>
            </Flex>
          )}
        </Flex>
      </Box>

      {/* Courses */}
      <Box p={6}>
        {track.courses.map(course => (
          <CourseSection key={course.id} track={track} course={course} />
        ))}
      </Box>
    </Box>
  );
}

export default function CoursesPage() {
  const tracks = getAllTracks();

  return (
    <Box bg="gray.50" minH="100vh" py={{ base: 8, md: 12 }}>
      <Container maxW="5xl">
        {/* Header */}
        <VStack gap={3} textAlign="center" mb={10}>
          <Badge
            bg="brand.50"
            color="brand.600"
            px={4}
            py={1.5}
            borderRadius="full"
            fontWeight="600"
            fontSize="sm"
          >
            <HStack gap={1.5}>
              <BookOpen size={14} />
              <span>All Courses</span>
            </HStack>
          </Badge>
          <Heading
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="700"
            color="gray.900"
          >
            Pick a track and start learning
          </Heading>
          <Text color="gray.600" fontSize="lg" maxW="500px">
            Interactive lessons that teach you by doing, not watching.
          </Text>
        </VStack>

        {/* Track Sections */}
        {tracks.map(track => (
          <TrackSection key={track.id} track={track} />
        ))}
      </Container>
    </Box>
  );
}
