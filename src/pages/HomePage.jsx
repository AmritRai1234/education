import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';
import { 
  ArrowRight, 
  Play, 
  BookOpen, 
  Brain, 
  Zap, 
  Flame,
  CheckCircle,
  Sparkles,
  Code,
  Target,
  Trophy,
  TrendingUp,
} from 'lucide-react';
import { getAllTracks } from '../data/lessons';
import { getStreak, getXP, getProgress, getLevel, getLevelProgress, getTotalLessonsCompleted } from '../data/progress';
import { FadeInUp, StaggerContainer, StaggerItem, Float, AnimatedCounter, ProgressRing } from '../components/Animations';

// Track color mapping
const trackColors = {
  python: { bg: 'green.50', color: 'green.500', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' },
  rust: { bg: 'orange.50', color: 'orange.500', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' },
  react: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' },
  c: { bg: 'gray.100', color: 'gray.600', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' },
  algebra: { bg: 'purple.50', color: 'purple.500', gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)' },
  arithmetic: { bg: 'blue.50', color: 'blue.500', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' },
};

function HeroSection() {
  const xp = getXP();
  const level = getLevel(xp);
  const levelProgress = getLevelProgress(xp);

  return (
    <Box 
      bg="linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)"
      pt={{ base: 12, md: 20 }}
      pb={{ base: 16, md: 24 }}
      overflow="hidden"
      position="relative"
    >
      {/* Animated background decoration */}
      <Float amplitude={20} duration={6}>
        <Box
          position="absolute"
          top="-200px"
          right="-200px"
          w="500px"
          h="500px"
          bg="radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)"
          borderRadius="full"
        />
      </Float>
      <Float amplitude={15} duration={5}>
        <Box
          position="absolute"
          bottom="-100px"
          left="-100px"
          w="400px"
          h="400px"
          bg="radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 70%)"
          borderRadius="full"
        />
      </Float>

      <Container maxW="6xl" position="relative">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 10, lg: 16 }} alignItems="center">
          {/* Left Content */}
          <VStack align={{ base: 'center', lg: 'flex-start' }} gap={6} textAlign={{ base: 'center', lg: 'left' }}>
            <FadeInUp delay={0}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                      <Sparkles size={14} />
                    </motion.div>
                    <span>Interactive Learning Platform</span>
                  </HStack>
                </Badge>
              </motion.div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <Heading
                as="h1"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="800"
                color="gray.900"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                Learn to code by{' '}
                <Text as="span" color="brand.500" position="relative">
                  solving problems
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)',
                      borderRadius: '2px',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </Text>
              </Heading>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.600"
                maxW="500px"
                lineHeight="1.6"
              >
                Master programming through bite-sized interactive challenges. 
                Build real intuition, not just watch videos.
              </Text>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <HStack gap={4} pt={2}>
                <Link to="/courses">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      bg="gray.900"
                      color="white"
                      px={8}
                      h="52px"
                      fontWeight="600"
                      borderRadius="xl"
                      _hover={{ bg: 'gray.800' }}
                      boxShadow="0 4px 14px rgba(0, 0, 0, 0.1)"
                    >
                      <HStack gap={2}>
                        <span>Start Learning</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight size={18} />
                        </motion.div>
                      </HStack>
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/playground">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      borderColor="gray.300"
                      color="gray.700"
                      px={6}
                      h="52px"
                      fontWeight="600"
                      borderRadius="xl"
                      _hover={{ bg: 'gray.50', borderColor: 'gray.400' }}
                    >
                      <HStack gap={2}>
                        <Play size={18} />
                        <span>Try Playground</span>
                      </HStack>
                    </Button>
                  </motion.div>
                </Link>
              </HStack>
            </FadeInUp>
          </VStack>

          {/* Right - Animated Code Preview Card */}
          <FadeInUp delay={0.4}>
            <Box display={{ base: 'none', lg: 'block' }}>
              <motion.div
                initial={{ rotate: 2, y: 20 }}
                animate={{ rotate: 1, y: 0 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <Box
                  bg="gray.900"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="0 25px 50px rgba(0, 0, 0, 0.15)"
                >
                  {/* Window Header */}
                  <Flex bg="gray.800" px={4} py={3} align="center" gap={2}>
                    <Flex gap={2}>
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Box w={3} h={3} borderRadius="full" bg="red.400" />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Box w={3} h={3} borderRadius="full" bg="yellow.400" />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Box w={3} h={3} borderRadius="full" bg="green.400" />
                      </motion.div>
                    </Flex>
                    <Text color="gray.500" fontSize="sm" fontFamily="mono" ml={3}>
                      challenge.py
                    </Text>
                  </Flex>
                  
                  {/* Typing Animation Code Content */}
                  <Box px={6} py={5} fontFamily="mono" fontSize="sm" lineHeight="1.8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Text color="purple.400" display="inline">def</Text>
                      <Text as="span" color="blue.300"> fibonacci</Text>
                      <Text as="span" color="gray.400">(</Text>
                      <Text as="span" color="orange.300">n</Text>
                      <Text as="span" color="gray.400">):</Text>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Text as="span" color="gray.500" ml={4}>    </Text>
                      <Text as="span" color="purple.400">if</Text>
                      <Text as="span" color="white"> n {'<='} </Text>
                      <Text as="span" color="green.300">1</Text>
                      <Text as="span" color="gray.400">:</Text>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <Text as="span" color="gray.500" ml={8}>        </Text>
                      <Text as="span" color="purple.400">return</Text>
                      <Text as="span" color="white"> n</Text>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Text as="span" color="gray.500" ml={4}>    </Text>
                      <Text as="span" color="purple.400">return</Text>
                      <Text as="span" color="blue.300"> fibonacci</Text>
                      <Text as="span" color="gray.400">(</Text>
                      <Text as="span" color="white">n-</Text>
                      <Text as="span" color="green.300">1</Text>
                      <Text as="span" color="gray.400">)</Text>
                      <Text as="span" color="white"> + </Text>
                      <Text as="span" color="blue.300">fibonacci</Text>
                      <Text as="span" color="gray.400">(</Text>
                      <Text as="span" color="white">n-</Text>
                      <Text as="span" color="green.300">2</Text>
                      <Text as="span" color="gray.400">)</Text>
                    </motion.div>
                    <Box h={4} />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      <Text color="gray.500"># What does fibonacci(6) return?</Text>
                    </motion.div>
                  </Box>

                  {/* Output with animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                  >
                    <Flex
                      bg="gray.800"
                      px={6}
                      py={4}
                      borderTop="1px solid"
                      borderColor="gray.700"
                      justify="space-between"
                      align="center"
                    >
                      <HStack gap={2}>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Box w={2} h={2} borderRadius="full" bg="green.400" />
                        </motion.div>
                        <Text color="gray.400" fontFamily="mono" fontSize="sm">8</Text>
                      </HStack>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.8, type: 'spring' }}
                      >
                        <Badge bg="green.500" color="white" px={3} py={1} borderRadius="full" fontSize="xs">
                          Correct!
                        </Badge>
                      </motion.div>
                    </Flex>
                  </motion.div>
                </Box>
              </motion.div>
            </Box>
          </FadeInUp>
        </Grid>
      </Container>
    </Box>
  );
}

function StatsStrip() {
  const xp = getXP();
  const streak = getStreak();
  const level = getLevel(xp);
  const lessonsCompleted = getTotalLessonsCompleted();

  const stats = [
    { icon: Trophy, value: level, label: 'Current Level', color: 'yellow.500' },
    { icon: Target, value: lessonsCompleted, label: 'Lessons Completed', color: 'brand.500' },
    { icon: Zap, value: xp, label: 'XP Earned', color: 'purple.500' },
    { icon: Flame, value: streak || '0', label: 'Day Streak', color: 'orange.500', animate: streak > 0 },
  ];

  return (
    <Box bg="white" py={10} borderY="1px solid" borderColor="gray.100">
      <Container maxW="6xl">
        <StaggerContainer staggerDelay={0.1}>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 6, md: 8 }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={i}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                    <Flex align="center" gap={4}>
                      <motion.div
                        animate={stat.animate ? { 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Flex
                          w={12}
                          h={12}
                          borderRadius="xl"
                          bg={`${stat.color.split('.')[0]}.50`}
                          align="center"
                          justify="center"
                          flexShrink={0}
                        >
                          <Icon size={22} color={`var(--chakra-colors-${stat.color.replace('.', '-')})`} />
                        </Flex>
                      </motion.div>
                      <Box>
                        <Text fontWeight="700" fontSize="2xl" color="gray.900" lineHeight="1">
                          <AnimatedCounter value={Number(stat.value) || 0} />
                        </Text>
                        <Text color="gray.500" fontSize="sm">
                          {stat.label}
                        </Text>
                      </Box>
                    </Flex>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </SimpleGrid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Learn a Concept',
      desc: 'Each step introduces one idea with visual examples and real code you can run.',
      icon: Brain,
      color: 'brand.500',
    },
    {
      num: '02',
      title: 'Solve a Challenge',
      desc: 'Apply what you learned with multiple-choice, fill-in-the-code, or ordering puzzles.',
      icon: Code,
      color: 'orange.500',
    },
    {
      num: '03',
      title: 'Get Instant Feedback',
      desc: 'Mistakes are caught in real-time with helpful explanations that guide you.',
      icon: CheckCircle,
      color: 'green.500',
    },
    {
      num: '04',
      title: 'Track Your Progress',
      desc: 'Earn XP, build streaks, and watch your mastery grow across all tracks.',
      icon: Target,
      color: 'purple.500',
    },
  ];

  return (
    <Box py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="6xl">
        <FadeInUp>
          <VStack gap={4} textAlign="center" mb={16}>
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="700"
              color="gray.900"
            >
              How CodePath Works
            </Heading>
            <Text color="gray.600" fontSize="lg" maxW="600px">
              Every concept is taught through interactive challenges - not passive reading.
            </Text>
          </VStack>
        </FadeInUp>

        <StaggerContainer staggerDelay={0.15}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      bg="gray.50"
                      p={8}
                      borderRadius="2xl"
                      position="relative"
                      h="100%"
                      cursor="pointer"
                    >
                      <Text
                        position="absolute"
                        top={4}
                        right={4}
                        fontSize="sm"
                        fontWeight="600"
                        color="gray.300"
                        fontFamily="mono"
                      >
                        {step.num}
                      </Text>
                      <VStack align="flex-start" gap={4}>
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Flex
                            w={12}
                            h={12}
                            borderRadius="xl"
                            bg={`${step.color.split('.')[0]}.100`}
                            align="center"
                            justify="center"
                          >
                            <Icon size={24} color={`var(--chakra-colors-${step.color.replace('.', '-')})`} />
                          </Flex>
                        </motion.div>
                        <Heading fontSize="lg" fontWeight="600" color="gray.900">
                          {step.title}
                        </Heading>
                        <Text color="gray.600" fontSize="sm" lineHeight="1.6">
                          {step.desc}
                        </Text>
                      </VStack>
                    </Box>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </SimpleGrid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}

function TrackCard({ track, index }) {
  const colors = trackColors[track.id] || trackColors.python;

  return (
    <Link to={`/track/${track.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
      >
        <Box
          bg="white"
          borderRadius="2xl"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.100"
          h="100%"
          position="relative"
        >
          {/* Top gradient bar with animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          >
            <Box h="4px" bg={colors.gradient} />
          </motion.div>
          
          <Box p={6}>
            <HStack justify="space-between" mb={4}>
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
              <Badge
                bg="gray.100"
                color="gray.600"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="600"
              >
                {track.courses[0]?.lessonCount || 0} lessons
              </Badge>
            </HStack>

            <Heading fontSize="xl" fontWeight="700" color="gray.900" mb={2}>
              {track.name}
            </Heading>
            
            <Text color={colors.color} fontSize="sm" fontWeight="500" mb={3}>
              {track.tagline}
            </Text>
            
            <Text color="gray.600" fontSize="sm" lineHeight="1.6" noOfLines={2}>
              {track.description}
            </Text>

            <Flex mt={6} align="center" justify="space-between">
              <Text color={colors.color} fontWeight="600" fontSize="sm">
                Start Learning
              </Text>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={18} color={`var(--chakra-colors-${colors.color.replace('.', '-')})`} />
              </motion.div>
            </Flex>
          </Box>
        </Box>
      </motion.div>
    </Link>
  );
}

function TracksSection() {
  const tracks = getAllTracks();

  return (
    <Box py={{ base: 16, md: 24 }} bg="gray.50">
      <Container maxW="6xl">
        <FadeInUp>
          <VStack gap={4} textAlign="center" mb={12}>
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="700"
              color="gray.900"
            >
              Choose Your Track
            </Heading>
            <Text color="gray.600" fontSize="lg" maxW="500px">
              Four languages. One interactive format. Start anywhere.
            </Text>
          </VStack>
        </FadeInUp>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
          {tracks.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

function Footer() {
  return (
    <FadeInUp>
      <Box bg="white" borderTop="1px solid" borderColor="gray.100" py={10}>
        <Container maxW="6xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <HStack gap={2}>
                <Flex
                  w="32px"
                  h="32px"
                  bg="gray.900"
                  borderRadius="lg"
                  align="center"
                  justify="center"
                >
                  <Text color="white" fontWeight="bold" fontSize="sm" fontFamily="mono">
                    {'</>'}
                  </Text>
                </Flex>
                <Text fontWeight="600" color="gray.900">
                  CodePath
                </Text>
              </HStack>
            </motion.div>
            <Text color="gray.500" fontSize="sm">
              Learn programming interactively. Built with care.
            </Text>
          </Flex>
        </Container>
      </Box>
    </FadeInUp>
  );
}

export default function HomePage() {
  return (
    <Box>
      <HeroSection />
      <StatsStrip />
      <HowItWorks />
      <TracksSection />
      <Footer />
    </Box>
  );
}
