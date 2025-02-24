import { Box, Text, VStack, Icon, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaSmile, FaFrown } from 'react-icons/fa'

export default function PredictionResult({ prediction }) {
  if (!prediction) return null

  const isSurvived = prediction.prediction === 'Survived'
  const IconComponent = isSurvived ? FaSmile : FaFrown

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <Box
        mt={4}
        p={6}
        borderRadius="lg"
        bg={isSurvived ? 'green.500' : 'red.500'}
        color="white"
        boxShadow="lg"
      >
        <VStack spacing={4}>
          <Icon as={IconComponent} boxSize={12} />
          <Text fontSize="2xl" fontWeight="bold">
            {isSurvived ? 'Survived' : 'Did Not Survive'}
          </Text>
          <Text fontSize="lg">Confidence: {prediction.probability}%</Text>
          <Image
            src={isSurvived ? '/titanic-save.jpg' : '/titanic-wreck.jpg'}
            alt={isSurvived ? 'Titanic Save' : 'Titanic Wreck'}
            boxSize="150px"
            objectFit="cover"
            borderRadius="md"
          />
          <Text fontSize="md" textAlign="center">
            {isSurvived
              ? 'The passenger has a high chance of survival!'
              : 'Unfortunately, the odds are not in the passenger’s favor.'}
          </Text>
        </VStack>
      </Box>
    </motion.div>
  )
}
