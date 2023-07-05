import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './nearbyjobs.style'
import { COLORS, SIZES } from '../../../constants'
import { NearbyJobCard } from '../../common/cards/nearby/NearbyJobCard'
import { useFetch } from '../../../hook/useFetch'


export const Nearbyjobs = () => {
  const router = useRouter()
  const {data, isLoading, error, refreshFetchData } = useFetch('search', {
    query: 'React developer',
    num_pages: 1
  })


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Near by jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' colors={COLORS.primary}/>
        ) : error ? (
          <Text> Something went wrong</Text>
        ) : (
          <FlatList
          data={data}
          renderItem={({item}) => (
            <NearbyJobCard  item={item}/>
          )}
          keyExtractor={item => item?.job_id }
          contentContainerStyle={{columnGap: SIZES.medium}}
          horizontal
          />
        )}
      </View>
    </View>
  )
}