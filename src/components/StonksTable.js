import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

export const StonksTable = ({data}) => {
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

  return (
    <>
      <View style={styles.tableDescriptionContainer}>
        <Text style={[styles.tableDescriptionCell, {width: 78}]}>Валюта</Text>
        <Text style={styles.tableDescriptionCell}>Last</Text>
        <Text style={styles.tableDescriptionCell}>Highest Bid</Text>
        <Text style={[styles.tableDescriptionCell, {marginRight: 0}]}>
          % change
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={ListItem}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
