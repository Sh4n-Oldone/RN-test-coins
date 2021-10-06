import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getContent} from '../../servises/content';
import {mainColor} from '../../settings/constants';

const StonksScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [needToLoad, setNeedToLoad] = useState(false);

  useEffect(() => {
    if (!needToLoad && data) {
      setTimeout(() => {
        setNeedToLoad(true);
      }, 5000);
    }
    if (needToLoad || !data) {
      getContent().then(resData => {
        if (!resData) {
          return setIsError(true);
        }

        const mappedDataArray = [...data];

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
        setData(mappedDataArray);
        setIsLoading(false);
        setNeedToLoad(false);
        console.log('Fresh Stock loaded');
      });
    }
  }, [needToLoad]);

  const getColor = (goingUp, goingDown) => {
    if (goingUp) {
      return 'green';
    }
    if (goingDown) {
      return 'red';
    }
    return 'grey';
  };

  const ListItem = ({item}) => {
    const {
      id,
      last,
      highestBid,
      percentChange,
      stockName,
      isGoingUp,
      isGoingDown,
    } = item;
    return (
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.itemCell,
            {backgroundColor: getColor(isGoingUp, isGoingDown), width: 78},
          ]}>
          {stockName.replace('_', ' ')}
        </Text>
        <Text style={styles.itemCell}>{last}</Text>
        <Text style={styles.itemCell}>{highestBid}</Text>
        <Text style={[styles.itemCell, {marginRight: 0}]}>{percentChange}</Text>
      </View>
    );
  };

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
        <View style={styles.tableDescriptionContainer}>
          <Text style={[styles.tableDescriptionCell, {width: 78}]}>Валюта</Text>
          <Text style={styles.tableDescriptionCell}>Last</Text>
          <Text style={styles.tableDescriptionCell}>Highest Bid</Text>
          <Text style={[styles.tableDescriptionCell, {marginRight: 0}]}>
            % change
          </Text>
        </View>
        {!isError && (
          <FlatList
            data={data.slice(0, 30)}
            renderItem={ListItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
};

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
  tableDescriptionContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  tableDescriptionCell: {
    fontSize: 14,
    textAlign: 'center',
    width: 82,
    marginRight: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  itemCell: {
    backgroundColor: '#D4F5DB',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 5,
    borderWidth: 1,
    width: 82,
    height: 35,
  },
});

export default StonksScreen;
