import React from 'react'
import {  View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import CustomRow from '../Profe/CustomRow'
import CommonDataManager from '../Profe/CommonDataManager';
import { ActivityIndicator } from 'react-native';

//https://stackoverflow.com/questions/42847263/how-to-render-a-loader-until-data-is-fetched-in-react-native
//https://api.themoviedb.org/3/search/movie?api_key=49a6206e72d73e13c8690652f47703e2&language=en-US&query=avengers%3A%20end&include_adult=false

export default class List extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: true
        }
    }
    alertItemName = (item) => {
    }

    render() {
        navigator = this.props.navigator;
        return (
            <View>

                <ActivityIndicator
                    animating={false}
                    style={styles.indicator}
                    size="large"
                />
                <ScrollView>
                    {
                        CommonDataManager.getInstance().getMoviesJSON().results.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.container}
                                onPress={() => { navigator.navigate('Perfil', {id: item.id})}}>
                                <CustomRow
                                    title={item.title}
                                    description={item.vote_average}
                                    image_url={'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + item.poster_path}
                                />
                            </TouchableOpacity>
                        ))
                    }
                    
                </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
});
