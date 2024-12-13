import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTimer} from 'react-timer-hook';
import shuffle from 'lodash.shuffle';
import {useFocusEffect} from '@react-navigation/native';
import {trigger} from 'react-native-haptic-feedback';
import CircularProgress from 'react-native-circular-progress-indicator';
import {CheckCircle, Circle, CircleCheck, CircleX} from 'lucide-react-native';
import FastImage from 'react-native-fast-image';

import Text from 'app/components/text';
import {questions} from 'app/assets/quizData';
import SafeView from 'app/components/safe-view';
import {saveGlobalScore, setActiveLevel} from 'app/store/coreReducer';
import {useAppDispatch, useAppSelector} from 'app/store/hooks';
import Button from 'app/components/button';
import {navigate} from 'app/navigationRef';

const time = new Date();
time.setSeconds(time.getSeconds() + 60);

const isOneTimeMode = true;
const randomQuestions = shuffle(questions).slice(0, 5);

const {width} = Dimensions.get('window');
const GameScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [score, setScore] = useState(0);
  const [gameMode, setGameMode] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [pressedAnswer, setPressedAnswer] = useState<number | null>(null);
  const activeData = randomQuestions[activeQuestion];

  const {globalScore, activeLevel = 0} = useAppSelector(state => state.core);

  const finishGame = () => {
    setTimeout(() => {
      Alert.alert('Game is over!', 'Your scored: ' + score, [
        {
          text: 'Ok',
          onPress: () => {
            setPressedAnswer(null);
            setScore(0);
            setGameMode(score >= 4 ? 'success' : 'error');
          },
        },
      ]);
    }, 700);
  };

  const {seconds, start, isRunning, restart} = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      if (isOneTimeMode) {
        finishGame();
      }
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      if (isOneTimeMode) {
        const nextTime = new Date();
        nextTime.setSeconds(nextTime.getSeconds() + 60);
        restart(nextTime);
        start();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOneTimeMode]),
  );

  const answerQuestion = (answerIndex: number) => {
    if (isOneTimeMode && !isRunning) {
      return;
    }

    setPressedAnswer(answerIndex);
    trigger('impactLight', {
      enableVibrateFallback: true,
    });

    if (answerIndex === activeData.correctAnswerIndex) {
      setAnsweredQuestions(
        Array.from(
          new Set([
            ...answeredQuestions,
            randomQuestions[activeQuestion].question,
          ]),
        ),
      );

      if (
        !answeredQuestions.includes(randomQuestions[activeQuestion].question)
      ) {
        setScore(score + 1);
      }

      if (answerIndex === randomQuestions.length - 1) {
        setGameMode('success');
      }
    }
  };

  return (
    <SafeView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.view}>
        <View>
          <Text
            mt={10}
            fontSize={18}
            mb={width <= 375 ? 20 : 30}
            ta="center"
            fontWeight="600">
            {activeQuestion + 1}/{randomQuestions.length}
          </Text>

          <View style={styles.progress}>
            {gameMode ? (
              <>
                {gameMode === 'success' && (
                  <CheckCircle color="#0C9000" size={60} />
                )}

                {gameMode === 'error' && <CircleX color="#FF0F00" size={60} />}
              </>
            ) : (
              <CircularProgress
                duration={1000}
                radius={40}
                value={seconds}
                maxValue={60}
                activeStrokeWidth={8}
                inActiveStrokeColor="#0C9000"
                inActiveStrokeOpacity={0.2}
              />
            )}
          </View>

          <View style={styles.shadowStyle}>
            {gameMode ? (
              <View>
                {gameMode === 'success' && (
                  <>
                    <Text ta="center" fontSize={18} fontWeight="600" mb={21}>
                      {score}/{randomQuestions.length} right answers, good
                      result!
                    </Text>
                    <View style={styles.row}>
                      <FastImage
                        source={require('app/assets/images/dimond.png')}
                        style={styles.diamond}
                      />
                      <Text ta="center" fontSize={12} fontWeight="600">
                        You earned: {score * 10} diamonds
                      </Text>
                    </View>
                  </>
                )}

                {gameMode === 'error' && (
                  <>
                    <Text ta="center" fontSize={18} fontWeight="600" mb={21}>
                      {score}/{randomQuestions.length} right answers, try again
                    </Text>
                    <View style={styles.row}>
                      <FastImage
                        source={require('app/assets/images/dimond.png')}
                        style={styles.diamond}
                      />
                      <Text ta="center" fontSize={12} fontWeight="600">
                        You earned: {score * 10} diamonds
                      </Text>
                    </View>
                  </>
                )}
              </View>
            ) : (
              <Text ta="center" fontSize={18} fontWeight="600">
                {activeData?.question}
              </Text>
            )}
          </View>

          {gameMode ? (
            <Button
              title={gameMode === 'success' ? 'Next level' : 'Go home'}
              onPress={() => {
                dispatch(saveGlobalScore(globalScore + score * 10));

                if (gameMode === 'success') {
                  dispatch(setActiveLevel(activeLevel + 1));
                }
                navigate('Home');
              }}
            />
          ) : (
            <>
              {activeData?.answers?.map((answer, index) => {
                const status =
                  pressedAnswer === activeData.correctAnswerIndex
                    ? 'success'
                    : 'error';

                return (
                  <TouchableOpacity
                    key={index}
                    disabled={isOneTimeMode ? !isRunning : false}
                    style={[
                      styles.button,
                      pressedAnswer === index && status === 'success'
                        ? styles.success
                        : null,
                      pressedAnswer === index && status === 'error'
                        ? styles.error
                        : null,
                    ]}
                    onPress={() => answerQuestion(index)}>
                    <Text
                      fontSize={20}
                      style={styles.text}
                      color={
                        pressedAnswer === index && status === 'error'
                          ? 'red'
                          : '#000'
                      }
                      fontWeight="600">
                      {answer}
                    </Text>

                    {pressedAnswer !== index && <Circle color="#000" />}
                    {pressedAnswer === index && status === 'success' && (
                      <CircleCheck color="#0C9000" />
                    )}
                    {pressedAnswer === index && status === 'error' && (
                      <CircleX color="#FF0000" />
                    )}
                  </TouchableOpacity>
                );
              })}

              <Button
                title="Next"
                disabled={!isRunning}
                onPress={() => {
                  if (pressedAnswer === null) {
                    return;
                  }

                  if (activeQuestion === randomQuestions.length - 1) {
                    setGameMode('success');
                  } else {
                    setActiveQuestion(activeQuestion + 1);
                    setPressedAnswer(null);
                  }
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
  },
  row: {
    gap: 6,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  success: {
    backgroundColor: '#ABD1C6',
  },
  error: {
    backgroundColor: '#FF8989',
  },
  progress: {
    alignItems: 'center',
    marginBottom: width <= 375 ? 20 : 30,
  },
  diamond: {width: 23, height: 23},
  shadowStyle: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    shadowColor: 'rgba(0, 0, 0, 0.15)', // Shadow color
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    marginBottom: width <= 375 ? 20 : 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  text: {
    maxWidth: '80%',
  },
  button: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    marginBottom: width <= 375 ? 15 : 30,
    minHeight: 53,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
});

export default GameScreen;
