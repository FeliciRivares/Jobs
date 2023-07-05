import React, { useState } from 'react'
import { View, Text, TextInput, Touchable, TouchableOpacity, Image, FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants'

const jobsType = ['Full-time', 'Part-time', 'Contractor']

const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {
  const [activeJobType, setActiveJobType] = useState('Full-time')
  const router = useRouter()

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello user_name</Text>
        <Text style={styles.welcomeMessage}>Find you perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {setSearchTerm(text)}}
            placeholder="What ara you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image style={styles.searchBtnImage} resizeMode="contain" source={icons.search} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobsType}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setActiveJobType(item)
                router.push(`/search/${item}`)
              }}
              style={styles.tab(activeJobType, item)}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome
