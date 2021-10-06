import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {StonksTable} from '../../components/StonksTable';
import {getContent} from '../../servises/content';
import {mainColor} from '../../settings/constants';
import {stockStore} from '../../store/store';

const StonksScreen = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [needToLoad, setNeedToLoad] = useState(false);

  const store = stockStore;

  useEffect(() => {
    if (!needToLoad && store.stock) {
      setTimeout(() => {
        setNeedToLoad(true);
      }, 5000);
    }
    if (needToLoad || !store.stock) {
      getContent().then(resData => {
        if (!resData) {
          return setIsError(true);
        }

        const mappedDataArray = [...store.stock];

        for (const key in resData) {
          const wasLoaded = mappedDataArray.find(
            item => item.id === resData[key].id,
          );
          const indexOfLastValue = wasLoaded
            ? mappedDataArray.findIndex(item => item.id === resData[key].id)
            : null;
          const mappedData = {
            stockName: key,
            ...resData[key],
            isGoingUp: wasLoaded ? wasLoaded.last < resData[key].last : null,
            isGoingDown: wasLoaded ? wasLoaded.last > resData[key].last : null,
          };
          wasLoaded
            ? (mappedDataArray[indexOfLastValue] = mappedData)
            : mappedDataArray.push(mappedData);
        }
        store.loadStock(mappedDataArray.slice(0, 30)); // срезал для удобства
        setIsLoading(false);
        setNeedToLoad(false);
        console.log('Fresh Stock loaded');
      });
    }
  }, [needToLoad]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    );
  }

  if (!isLoading) {
    return (
      <View style={styles.loadedContainer}>
        <View style={styles.errorCell}>
          <Text style={styles.errorCellText}>
            {isError ? 'Возникла ошибка при загрузке' : ''}
          </Text>
        </View>
        {!isError && store.stock && <StonksTable data={store.stock} />}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadedContainer: {
    flex: 1,
    paddingTop: 25,
  },
  errorCell: {
    width: '100%',
  },
  errorCellText: {
    textAlign: 'center',
    color: 'red',
  },
});

export default StonksScreen;
