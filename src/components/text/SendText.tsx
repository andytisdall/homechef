import {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Text, View, ScrollView, Platform} from 'react-native';
import {format} from 'date-fns';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {TextStackParamList} from './Text';
import Disabled from './Disabled';
import styles from './styles';
import Arrow from '../../assets/right-arrow.svg';
import TextPreview from './TextPreview';
import EnterName from './EnterName';
import EnterCount from './EnterCount';
import EnterFridge from './EnterFridge';
import EnterPhoto from './EnterPhoto';
import Loading from '../reusable/Loading';
import {PhotoFile} from '../reusable/AddPhoto';
import Btn from '../reusable/Btn';
import EnterRestaurants from './EnterRestaurants';
import UseStoredText from './UseStoredText';
import {useGetUserQuery} from '../../state/apis/authApi';
import {
  useCheckStoredQuery,
  useGetFridgesQuery,
  useSendTextMutation,
  useStoreTextMutation,
} from '../../state/apis/textApi';
import {setError} from '../../state/slices/errorSlice';
import {useCreateMealDeliveryMutation} from '../../state/apis/mealProgramApi';

type SendTextProps = NativeStackScreenProps<TextStackParamList, 'SendText'>;

const SendText = ({navigation}: SendTextProps) => {
  const [page, setPage] = useState(0);
  const [fridge, setFridge] = useState<number | undefined>();
  const [mealCount, setMealCount] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<PhotoFile | undefined>();
  const [restaurants, setRestaurants] = useState('');
  const [usingStoredText, setUsingStoredText] = useState(false);

  const [fieldValid, setFieldValid] = useState(false);

  const {data: user} = useGetUserQuery();
  const {data: townFridges} = useGetFridgesQuery();
  const {data: storedText} = useCheckStoredQuery();
  const [sendText, {isLoading}] = useSendTextMutation({
    fixedCacheKey: 'send-text',
  });
  const [createMealDelivery] = useCreateMealDeliveryMutation();

  const [storeText] = useStoreTextMutation();

  const dispatch = useDispatch();

  const scrollRef = useRef<ScrollView | null>(null);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const clearState = () => {
    setPage(0);
    setRestaurants('');
    setFridge(undefined);
    setMealCount('');
    setName('');
    setPhoto(undefined);
    setFieldValid(false);
    setUsingStoredText(false);
  };

  const getAddress = () => {
    if (fridge !== undefined && townFridges && townFridges[fridge].location) {
      return `, at ${townFridges[fridge].location},`;
    } else {
      return '';
    }
  };

  const getRegion = () => {
    if (fridge !== undefined && townFridges) {
      return townFridges[fridge].region;
    }
    return '';
  };

  const getChef = () => {
    if (!user?.busDriver) {
      return 'CK Home Chef volunteers';
    }
    return restaurants;
  };

  const getMealName = () => {
    if (!user?.busDriver) {
      return `The meal today is ${name}`;
    } else {
      return `The meals today are ${name}`;
    }
  };

  const message =
    fridge !== undefined && townFridges
      ? `Hello! ${
          townFridges[fridge].name
        } Town Fridge${getAddress()} has been stocked with ${mealCount} meals, made with love by ${getChef()}! Please take only what you need, and leave the rest to share. ${getMealName()}. Please respond to this message with any feedback. Enjoy!`
      : '';

  const prevPage = () => {
    // fix this
    if (storedText?.photoUrl && page === 5) {
      return setPage(3);
    }
    setPage(p => p - 1);
  };

  const nextPage = () => {
    if (fieldValid) {
      setPage(p => p + 1);
    }
  };

  const validateField = (criteria: boolean) => {
    if (!fieldValid && criteria) {
      setFieldValid(true);
    } else if (fieldValid && !criteria) {
      setFieldValid(false);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 0:
        if (!user?.busDriver) {
          setPage(1);
        }
        if (usingStoredText && storedText) {
          setRestaurants(storedText.restaurants);
          setName(storedText.name);
          setPage(2);
        }
        if (storedText) {
          return <UseStoredText setUsingStoredText={setUsingStoredText} />;
        }
        validateField(!!restaurants);
        return (
          <EnterRestaurants
            next={nextPage}
            restaurants={restaurants}
            setRestaurants={setRestaurants}
          />
        );
      case 1:
        if (usingStoredText) {
          setUsingStoredText(false);
          setPage(0);
        }
        validateField(!!name);
        return <EnterName setName={setName} name={name} next={nextPage} />;
      case 2:
        validateField(parseInt(mealCount, 10) > 0);
        return (
          <EnterCount
            next={nextPage}
            setMealCount={setMealCount}
            mealCount={mealCount}
          />
        );
      case 3:
        validateField(
          fridge !== undefined && !!townFridges && !!townFridges[fridge],
        );
        return (
          <EnterFridge
            setFridge={setFridge}
            fridge={fridge}
            region={getRegion()}
          />
        );
      case 4:
        if (storedText?.photoUrl) {
          nextPage();
        }
        validateField(true);
        return <EnterPhoto photo={photo} setPhoto={setPhoto} />;
      case 5:
        scrollToTop();
        return (
          <TextPreview
            message={message}
            region={getRegion()}
            photo={photo}
            onSubmit={() => {
              if (fridge !== undefined && townFridges && user) {
                const photoToSend = photo || null;
                if (photoToSend && Platform.OS === 'ios') {
                  photoToSend.uri = photo!.uri?.replace('file://', '');
                }
                sendText({
                  message,
                  region: townFridges[fridge].region,
                  photo: photoToSend,
                  name,
                  restaurants,
                  user,
                  storedText,
                })
                  .unwrap()
                  .then(response => {
                    if (user.busDriver) {
                      console.log(response);
                      storeText(response);
                    }
                    navigation.navigate('TextSuccess');
                  });
                clearState();
              }
            }}
            onCancel={clearState}
            createMealDelivery={() =>
              createMealDelivery({
                numberOfMealsMeat: parseInt(mealCount, 10),
                numberOfMealsVeg: 0,
              })
            }
          />
        );
      default:
        return <Text>An Error Occurred. Restart the App.</Text>;
    }
  };

  const renderNav = () => {
    const nextBtn = (
      <Btn
        onPress={nextPage}
        onError={() => {
          dispatch(setError('You must enter a value to proceed'));
        }}
        style={styles.sendTextNavBtn}
        disabled={!fieldValid}>
        <Arrow />
      </Btn>
    );

    const backBtn = (
      <Btn style={styles.sendTextNavBtn} onPress={prevPage}>
        <Arrow style={[styles.leftArrow]} />
      </Btn>
    );

    const isFirstPage =
      (user?.busDriver && page === 0) || (!user?.busDriver && page === 1);
    const isLastPage = page === 5;
    const firstPageStyle = isFirstPage ? styles.sendTextNavEnd : {};

    return (
      <View style={[styles.sendTextNav, firstPageStyle]}>
        {!isFirstPage && backBtn}
        {!isLastPage && nextBtn}
      </View>
    );
  };

  const outsideAllowableHours =
    parseInt(format(new Date(), 'H'), 10) > 19 ||
    parseInt(format(new Date(), 'H'), 10) < 8;

  if (isLoading) {
    return (
      <View style={styles.sendText}>
        <Loading />
      </View>
    );
  }

  if (outsideAllowableHours) {
    return (
      <View style={styles.sendText}>
        <Disabled />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView} ref={scrollRef}>
      <View style={styles.sendText}>
        {renderPage()}
        {renderNav()}
      </View>
    </ScrollView>
  );
};

export default SendText;
