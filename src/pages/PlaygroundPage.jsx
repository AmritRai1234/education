import { useState } from 'react';
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
  Button,
  Textarea,
} from '@chakra-ui/react';
import { Play, Trash2, Code, Terminal } from 'lucide-react';

const TEMPLATES = {
  python: {
    label: 'Python',
    icon: '{ }',
    color: 'green',
    code: `# Python Playground
# Try editing this code!

def greet(name):
    return f"Hello, {name}!"

message = greet("World")
print(message)

# Try a loop
for i in range(5):
    print(f"  Count: {i}")`,
    output: `Hello, World!
  Count: 0
  Count: 1
  Count: 2
  Count: 3
  Count: 4`,
  },
  rust: {
    label: 'Rust',
    icon: '{ }',
    color: 'orange',
    code: `// Rust Playground
// Explore Rust's type system!

fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    for i in 0..10 {
        println!("fib({}) = {}", i, fibonacci(i));
    }
}`,
    output: `fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34`,
  },
  react: {
    label: 'React',
    icon: '</>',
    color: 'blue',
    code: `// React Playground
// Build interactive UIs!

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;`,
    output: `Count: 0
[Increment] [Reset]`,
  },
  c: {
    label: 'C',
    icon: '*',
    color: 'gray',
    code: `// C Playground
// See how memory works!

#include <stdio.h>

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int *ptr = numbers;
    
    printf("Array elements via pointer:\\n");
    for (int i = 0; i < 5; i++) {
        printf("  *(ptr+%d) = %d  (addr: %p)\\n", 
               i, *(ptr + i), (void*)(ptr + i));
    }
    
    return 0;
}`,
    output: `Array elements via pointer:
  *(ptr+0) = 10  (addr: 0x7ffd00001000)
  *(ptr+1) = 20  (addr: 0x7ffd00001004)
  *(ptr+2) = 30  (addr: 0x7ffd00001008)
  *(ptr+3) = 40  (addr: 0x7ffd0000100c)
  *(ptr+4) = 50  (addr: 0x7ffd00001010)`,
  },
};

export default function PlaygroundPage() {
  const [lang, setLang] = useState('python');
  const [code, setCode] = useState(TEMPLATES.python.code);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const switchLang = (newLang) => {
    setLang(newLang);
    setCode(TEMPLATES[newLang].code);
    setOutput('');
  };

  const runCode = () => {
    setRunning(true);
    setOutput('');

    const template = TEMPLATES[lang];
    let i = 0;
    const chars = template.output.split('');

    const interval = setInterval(() => {
      if (i < chars.length) {
        setOutput((prev) => prev + chars[i]);
        i++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 15);
  };

  return (
    <Box bg="gray.50" minH="100vh" py={{ base: 6, md: 10 }}>
      <Container maxW="6xl">
        {/* Header */}
        <VStack gap={4} textAlign="center" mb={8}>
          <Badge
            bg="purple.50"
            color="purple.600"
            px={4}
            py={1.5}
            borderRadius="full"
            fontWeight="600"
            fontSize="sm"
          >
            <HStack gap={1.5}>
              <Code size={14} />
              <span>Code Playground</span>
            </HStack>
          </Badge>
          <Heading
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="700"
            color="gray.900"
          >
            Write, run, and experiment
          </Heading>
          <Text color="gray.600" fontSize="lg" maxW="500px">
            A sandbox to practice and test your code in any language.
          </Text>
        </VStack>

        {/* Language Tabs */}
        <Flex
          bg="white"
          borderRadius="2xl"
          border="1px solid"
          borderColor="gray.100"
          p={2}
          gap={2}
          mb={6}
          flexWrap="wrap"
          justify="center"
        >
          {Object.entries(TEMPLATES).map(([key, t]) => {
            const isActive = lang === key;
            return (
              <Button
                key={key}
                onClick={() => switchLang(key)}
                bg={isActive ? `${t.color}.50` : 'transparent'}
                color={isActive ? `${t.color}.600` : 'gray.600'}
                border="2px solid"
                borderColor={isActive ? `${t.color}.200` : 'transparent'}
                borderRadius="xl"
                px={5}
                py={2}
                fontWeight="600"
                fontSize="sm"
                _hover={{
                  bg: isActive ? `${t.color}.50` : 'gray.50',
                }}
                transition="all 0.2s"
              >
                <HStack gap={2}>
                  <Text fontFamily="mono" fontWeight="700">
                    {t.icon}
                  </Text>
                  <span>{t.label}</span>
                </HStack>
              </Button>
            );
          })}
        </Flex>

        {/* Editor */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
          {/* Code Panel */}
          <Box
            bg="gray.900"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
          >
            {/* Header */}
            <Flex
              bg="gray.800"
              px={5}
              py={3}
              align="center"
              justify="space-between"
            >
              <HStack gap={2}>
                <Flex gap={2}>
                  <Box w={3} h={3} borderRadius="full" bg="red.400" />
                  <Box w={3} h={3} borderRadius="full" bg="yellow.400" />
                  <Box w={3} h={3} borderRadius="full" bg="green.400" />
                </Flex>
                <Text color="gray.500" fontSize="sm" fontFamily="mono" ml={2}>
                  {TEMPLATES[lang].label.toLowerCase()}_playground
                </Text>
              </HStack>
              <Button
                onClick={runCode}
                disabled={running}
                bg="green.500"
                color="white"
                size="sm"
                borderRadius="lg"
                fontWeight="600"
                _hover={{ bg: 'green.600' }}
                _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
              >
                <HStack gap={1.5}>
                  <Play size={14} fill="currentColor" />
                  <span>{running ? 'Running...' : 'Run'}</span>
                </HStack>
              </Button>
            </Flex>

            {/* Code Editor */}
            <Box p={0}>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fontFamily="mono"
                fontSize="sm"
                lineHeight="1.7"
                bg="transparent"
                color="gray.100"
                border="none"
                borderRadius="0"
                resize="none"
                minH="400px"
                p={5}
                _focus={{ outline: 'none', boxShadow: 'none' }}
                _placeholder={{ color: 'gray.600' }}
                spellCheck={false}
              />
            </Box>
          </Box>

          {/* Output Panel */}
          <Box
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            overflow="hidden"
          >
            {/* Header */}
            <Flex
              bg="gray.50"
              px={5}
              py={3}
              align="center"
              justify="space-between"
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <HStack gap={2}>
                <Terminal size={16} color="#6b7280" />
                <Text color="gray.700" fontSize="sm" fontWeight="600">
                  Output
                </Text>
              </HStack>
              {output && (
                <Button
                  onClick={() => setOutput('')}
                  size="sm"
                  variant="ghost"
                  color="gray.500"
                  _hover={{ color: 'gray.700', bg: 'gray.100' }}
                >
                  <HStack gap={1}>
                    <Trash2 size={14} />
                    <span>Clear</span>
                  </HStack>
                </Button>
              )}
            </Flex>

            {/* Output Content */}
            <Box
              p={5}
              minH="400px"
              fontFamily="mono"
              fontSize="sm"
              lineHeight="1.7"
              bg="gray.900"
            >
              {output ? (
                <Text color="green.400" whiteSpace="pre-wrap">
                  {output}
                </Text>
              ) : (
                <Flex
                  h="100%"
                  minH="350px"
                  align="center"
                  justify="center"
                  direction="column"
                  gap={3}
                >
                  <Box
                    w={12}
                    h={12}
                    borderRadius="xl"
                    bg="gray.800"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Play size={24} color="#6b7280" />
                  </Box>
                  <Text color="gray.500" textAlign="center">
                    Click "Run" to see output
                  </Text>
                </Flex>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Tips Section */}
        <Box mt={10} p={6} bg="white" borderRadius="2xl" border="1px solid" borderColor="gray.100">
          <Heading fontSize="lg" fontWeight="600" color="gray.900" mb={4}>
            Tips
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            <VStack align="flex-start" gap={2}>
              <Text fontWeight="600" color="gray.800" fontSize="sm">
                Experiment freely
              </Text>
              <Text color="gray.600" fontSize="sm">
                This is a sandbox - try different code, make mistakes, and learn!
              </Text>
            </VStack>
            <VStack align="flex-start" gap={2}>
              <Text fontWeight="600" color="gray.800" fontSize="sm">
                Switch languages
              </Text>
              <Text color="gray.600" fontSize="sm">
                Use the tabs above to switch between Python, Rust, React, and C.
              </Text>
            </VStack>
            <VStack align="flex-start" gap={2}>
              <Text fontWeight="600" color="gray.800" fontSize="sm">
                Practice concepts
              </Text>
              <Text color="gray.600" fontSize="sm">
                Reinforce what you learn in lessons by writing your own code here.
              </Text>
            </VStack>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
