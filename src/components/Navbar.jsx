import { Link, useLocation } from 'react-router-dom';
import { Box, Flex, HStack, Text, Container, Badge } from '@chakra-ui/react';
import { Flame, Zap, BookOpen, Code, Home } from 'lucide-react';
import { getStreak, getXP } from '../data/progress';

export default function Navbar() {
  const location = useLocation();
  const streak = getStreak();
  const xp = getXP();

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
            <HStack gap={2} _hover={{ opacity: 0.8 }} transition="opacity 0.2s">
              <Flex
                w="36px"
                h="36px"
                bg="linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)"
                borderRadius="lg"
                align="center"
                justify="center"
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
          </Link>

          {/* Navigation Links */}
          <HStack gap={1} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link key={link.path} to={link.path}>
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
                  >
                    <Icon size={18} />
                    {link.label}
                  </Flex>
                </Link>
              );
            })}
          </HStack>

          {/* Stats */}
          <HStack gap={3}>
            {streak > 0 && (
              <Flex
                align="center"
                gap={1.5}
                px={3}
                py={1.5}
                bg="orange.50"
                borderRadius="full"
                title={`${streak} day streak!`}
              >
                <Flame size={16} color="#f97316" fill="#f97316" />
                <Text fontWeight="600" fontSize="sm" color="orange.600">
                  {streak}
                </Text>
              </Flex>
            )}
            <Flex
              align="center"
              gap={1.5}
              px={3}
              py={1.5}
              bg="purple.50"
              borderRadius="full"
              title={`${xp} XP earned`}
            >
              <Zap size={16} color="#a855f7" fill="#a855f7" />
              <Text fontWeight="600" fontSize="sm" color="purple.600">
                {xp}
              </Text>
            </Flex>
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
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);
          return (
            <Link key={link.path} to={link.path}>
              <Flex
                direction="column"
                align="center"
                gap={1}
                px={3}
                py={1}
                color={active ? 'brand.600' : 'gray.500'}
              >
                <Icon size={20} />
                <Text fontSize="xs" fontWeight={active ? '600' : '500'}>
                  {link.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
