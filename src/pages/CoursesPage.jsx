import { Link } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { ArrowRight, CheckCircle, BookOpen, Trophy, Zap } from 'lucide-react';
import { getAllTracks } from '../data/lessons';
import { getTrackProgress, isLessonComplete, getLessonProgress } from '../data/progress';
import { FadeInUp, StaggerContainer, StaggerItem } from '../components/Animations';

// Track color mapping
const trackColors = {
  python: { bg: 'green.50', color: 'green.500', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', hex: '#22c55e' },
  rust: { bg: 'orange.50', color: 'orange.500', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', hex: '#f97316' },
  react: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', hex: '#0ea5e9' },
  c: { bg: 'gray.100', color: 'gray.600', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)', hex: '#64748b' },
  algebra: { bg: 'purple.50', color: 'purple.500', gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)', hex: '#a855f7' },
  arithmetic: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', hex: '#0ea5e9' },
};

function LessonCard({ track, courseId, lesson, index }) {
  const colors = trackColors[track.id] || trackColors.python;
  const complete = isLessonComplete(lesson.id);
  const progress = getLessonProgress(lesson.id, lesson.steps.length);

  return (
    <Link to={`/track/${track.id}/${courseId}/${lesson.id}`}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ x: 4, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Flex
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor={complete ? 'green.200' : 'gray.100'}
          p={4}
          align="center"
          gap={4}
          position="relative"
          overflow="hidden"
          _hover={{
            borderColor: complete ? 'green.300' : colors.color,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Progress indicator bar */}
          {progress > 0 && !complete && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '3px',
                background: colors.gradient,
                borderRadius: '9999px',
              }}
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
              >
                <CheckCircle size={20} color="#22c55e" />
              </motion.div>
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

          {/* XP badge for completed */}
          {complete && (
            <Badge bg="purple.100" color="purple.700" px={2} py={0.5} borderRadius="full" fontSize="xs">
              <HStack gap={1}>
                <Zap size={10} />
                <span>+{lesson.steps.length * 10 + 50}</span>
              </HStack>
            </Badge>
          )}

          {/* Arrow */}
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={16} color={complete ? '#22c55e' : '#9ca3af'} />
          </motion.div>
        </Flex>
      </motion.div>
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

function TrackSection({ track, index }) {
  const colors = trackColors[track.id] || trackColors.python;
  const allLessons = track.courses.flatMap(c => c.lessons);
  const progress = getTrackProgress(track.id, allLessons);
  const completedCount = allLessons.filter(l => isLessonComplete(l.id)).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
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
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
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
              </motion.div>
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
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
              >
                <Flex 
                  align="center" 
                  gap={3} 
                  bg="white" 
                  px={4} 
                  py={2} 
                  borderRadius="full" 
                  border="1px solid" 
                  borderColor="gray.200"
                >
                  <Box w="100px" h="6px" bg="gray.100" borderRadius="full" overflow="hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 + index * 0.15 }}
                      style={{
                        height: '100%',
                        background: colors.gradient,
                        borderRadius: '9999px',
                      }}
                    />
                  </Box>
                  <Text fontSize="sm" fontWeight="600" color="gray.700">
                    {progress}%
                  </Text>
                </Flex>
              </motion.div>
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
    </motion.div>
  );
}

export default function CoursesPage() {
  const tracks = getAllTracks();

  return (
    <Box bg="gray.50" minH="100vh" py={{ base: 8, md: 12 }}>
      <Container maxW="5xl">
        {/* Header */}
        <FadeInUp>
          <VStack gap={3} textAlign="center" mb={10}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <BookOpen size={14} />
                  </motion.div>
                  <span>All Courses</span>
                </HStack>
              </Badge>
            </motion.div>
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
        </FadeInUp>

        {/* Track Sections */}
        {tracks.map((track, i) => (
          <TrackSection key={track.id} track={track} index={i} />
        ))}
      </Container>
    </Box>
  );
}
