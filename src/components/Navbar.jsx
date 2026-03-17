import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Flex, HStack, Text, Container, Badge, VStack } from '@chakra-ui/react';
import { Flame, Zap, BookOpen, Code, Home, Trophy, Star } from 'lucide-react';
import { getStreak, getXP, getLevel, getLevelProgress } from '../data/progress';
import { ProgressRing } from './Animations';

export default function Navbar() {
  const location = useLocation();
  const streak = getStreak();
  const xp = getXP();
  const level = getLevel(xp);
  const levelProgress = getLevelProgress(xp);

  const isActive = (path) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/playground', label: 'Playground', icon: Code },
  ];

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="1000"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      backdropFilter="blur(12px)"
      backgroundColor="rgba(255, 255, 255, 0.95)"
    >
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <Flex h="64px" align="center" justify="space-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HStack gap={2}>
                <Flex
                  w="36px"
                  h="36px"
                  bg="linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)"
                  borderRadius="lg"
                  align="center"
                  justify="center"
                  boxShadow="0 2px 8px rgba(14, 165, 233, 0.3)"
                >
                  <Text color="white" fontWeight="bold" fontSize="lg" fontFamily="mono">
                    {'</>'}
                  </Text>
                </Flex>
                <Text
                  fontWeight="700"
                  fontSize="xl"
                  color="gray.900"
                  letterSpacing="-0.02em"
                >
                  CodePath
                </Text>
              </HStack>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <HStack gap={1} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link key={link.path} to={link.path}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Flex
                      align="center"
                      gap={2}
                      px={4}
                      py={2}
                      borderRadius="full"
                      fontWeight="500"
                      fontSize="sm"
                      color={active ? 'brand.600' : 'gray.600'}
                      bg={active ? 'brand.50' : 'transparent'}
                      _hover={{
                        bg: active ? 'brand.50' : 'gray.50',
                        color: active ? 'brand.600' : 'gray.800',
                      }}
                      transition="all 0.2s"
                      position="relative"
                    >
                      <Icon size={18} />
                      {link.label}
                      {active && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          style={{
                            position: 'absolute',
                            bottom: '-2px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '20px',
                            height: '3px',
                            background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)',
                            borderRadius: '2px',
                          }}
                        />
                      )}
                    </Flex>
                  </motion.div>
                </Link>
              );
            })}
          </HStack>

          {/* Stats */}
          <HStack gap={3}>
            {/* Level Badge with Progress Ring */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Flex
                align="center"
                gap={2}
                px={3}
                py={1.5}
                bg="yellow.50"
                borderRadius="full"
                title={`Level ${level} - ${levelProgress}% to next level`}
                cursor="pointer"
                position="relative"
              >
                <Box position="relative">
                  <ProgressRing 
                    progress={levelProgress} 
                    size={28} 
                    strokeWidth={3} 
                    color="#eab308" 
                  />
                  <Flex
                    position="absolute"
                    inset={0}
                    align="center"
                    justify="center"
                  >
                    <Text fontWeight="800" fontSize="xs" color="yellow.600">
                      {level}
                    </Text>
                  </Flex>
                </Box>
                <VStack gap={0} align="flex-start" display={{ base: 'none', lg: 'flex' }}>
                  <Text fontWeight="600" fontSize="xs" color="yellow.700" lineHeight="1">
                    Level
                  </Text>
                  <Text fontWeight="500" fontSize="10px" color="yellow.600" lineHeight="1">
                    {levelProgress}%
                  </Text>
                </VStack>
              </Flex>
            </motion.div>

            {/* Streak Badge */}
            {streak > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Flex
                  align="center"
                  gap={1.5}
                  px={3}
                  py={1.5}
                  bg="orange.50"
                  borderRadius="full"
                  title={`${streak} day streak!`}
                  cursor="pointer"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    <Flame size={18} color="#f97316" fill="#f97316" />
                  </motion.div>
                  <Text fontWeight="700" fontSize="sm" color="orange.600">
                    {streak}
                  </Text>
                </Flex>
              </motion.div>
            )}

            {/* XP Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Flex
                align="center"
                gap={1.5}
                px={3}
                py={1.5}
                bg="purple.50"
                borderRadius="full"
                title={`${xp} XP earned`}
                cursor="pointer"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Zap size={18} color="#a855f7" fill="#a855f7" />
                </motion.div>
                <Text fontWeight="700" fontSize="sm" color="purple.600">
                  {xp}
                </Text>
              </Flex>
            </motion.div>
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Navigation */}
      <Flex
        display={{ base: 'flex', md: 'none' }}
        borderTop="1px solid"
        borderColor="gray.100"
        justify="space-around"
        py={2}
        px={4}
        bg="white"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);
          return (
            <Link key={link.path} to={link.path}>
              <motion.div
                whileTap={{ scale: 0.9 }}
              >
                <Flex
                  direction="column"
                  align="center"
                  gap={1}
                  px={3}
                  py={1}
                  color={active ? 'brand.600' : 'gray.500'}
                  position="relative"
                >
                  <Icon size={20} />
                  <Text fontSize="xs" fontWeight={active ? '600' : '500'}>
                    {link.label}
                  </Text>
                  {active && (
                    <motion.div
                      layoutId="activeMobileNavIndicator"
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        width: '4px',
                        height: '4px',
                        background: '#0ea5e9',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </Flex>
              </motion.div>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
