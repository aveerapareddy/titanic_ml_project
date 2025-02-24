import { useState } from 'react'
import {
  ChakraProvider,
  Box,
  Button,
  Input,
  Select,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Container,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import axios from 'axios'
import PredictionResult from './components/PredictionResult'
import theme from './theme'

const API_URL = import.meta.env.VITE_API_URL

export default function App() {
  const [formData, setFormData] = useState({
    Pclass: '3',
    Sex: 'male',
    Age: '',
    SibSp: '0',
    Parch: '0',
    Fare: '',
    Embarked: 'S',
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setPrediction(null)

    const payload = {
      Pclass: parseInt(formData.Pclass),
      Sex: formData.Sex === 'female' ? 1 : 0,
      Age: parseFloat(formData.Age),
      SibSp: parseInt(formData.SibSp),
      Parch: parseInt(formData.Parch),
      Fare: parseFloat(formData.Fare),
      Embarked_Q: formData.Embarked === 'Q' ? 1 : 0,
      Embarked_S: formData.Embarked === 'S' ? 1 : 0,
    }

    try {
      const res = await axios.post(`${API_URL}/predict`, payload)
      setPrediction(res.data)
    } catch (err) {
      setError('Error connecting to API. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="black" py={10} px={4}>
        <Container maxW="900px">
          <Text
            fontSize="4xl"
            fontWeight="extrabold"
            textAlign="center"
            mb={8}
            color="cyan.300"
            textShadow="0 0 10px cyan"
          >
            🚢 TITANIC SURVIVAL PREDICTOR
          </Text>

          {error && (
            <Alert
              status="error"
              mb={4}
              border="1px solid"
              borderColor="red.500"
              bg="gray.900"
              color="red.300"
            >
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
            {/* Form Section */}
            <GridItem
              as={motion.div}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                bg="gray.800"
                p={8}
                borderRadius="lg"
                boxShadow="0 0 20px cyan"
              >
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={6}
                  color="cyan.300"
                  textShadow="0 0 5px cyan"
                >
                  Enter Passenger Details
                </Text>
                <VStack
                  spacing={4}
                  as="form"
                  onSubmit={handleSubmit}
                  align="stretch"
                >
                  <FormControl>
                    <FormLabel color="cyan.300">Pclass</FormLabel>
                    <Select
                      name="Pclass"
                      value={formData.Pclass}
                      onChange={handleChange}
                      bg="gray.700"
                      color="white"
                      borderColor="cyan.300"
                    >
                      <option value="1">1st Class</option>
                      <option value="2">2nd Class</option>
                      <option value="3">3rd Class</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel color="cyan.300">Gender</FormLabel>
                    <Select
                      name="Sex"
                      value={formData.Sex}
                      onChange={handleChange}
                      bg="gray.700"
                      color="white"
                      borderColor="cyan.300"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel color="cyan.300">Age</FormLabel>
                    <Input
                      type="number"
                      name="Age"
                      placeholder="Enter age"
                      value={formData.Age}
                      onChange={handleChange}
                      required
                      bg="gray.700"
                      color="white"
                      borderColor="cyan.300"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="cyan.300">Siblings/Spouses</FormLabel>
                    <Input
                      type="number"
                      name="SibSp"
                      placeholder="Enter number"
                      value={formData.SibSp}
                      onChange={handleChange}
                      bg="gray.700"
                      color="white"
                      borderColor="cyan.300"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="cyan.300">Fare</FormLabel>
                    <Input
                      type="number"
                      name="Fare"
                      placeholder="Enter fare"
                      value={formData.Fare}
                      onChange={handleChange}
                      required
                      bg="gray.700"
                      color="white"
                      borderColor="cyan.300"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="cyan.300">Embarked</FormLabel>
                    <Select
                      name="Embarked"
                      value={formData.Embarked}
                      onChange={handleChange}
                      bg="gray.700"
                      color="white"
                      borderColor="cyan.300"
                    >
                      <option value="S">Southampton</option>
                      <option value="C">Cherbourg</option>
                      <option value="Q">Queenstown</option>
                    </Select>
                  </FormControl>

                  <Button
                    colorScheme="cyan"
                    type="submit"
                    isLoading={loading}
                    variant="solid"
                    _hover={{ boxShadow: '0 0 20px cyan' }}
                  >
                    Predict
                  </Button>
                </VStack>
              </Box>
            </GridItem>

            {/* Prediction Results Section */}
            <GridItem
              as={motion.div}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                bg="gray.800"
                p={8}
                borderRadius="lg"
                boxShadow="0 0 20px magenta"
                minH="100%"
              >
                <PredictionResult prediction={prediction} />
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  )
}
