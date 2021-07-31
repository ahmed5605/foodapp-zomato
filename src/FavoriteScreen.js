/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import {Text, ImageBackground, Dimensions, ScrollView, View,FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import Heart from 'react-native-vector-icons/AntDesign';


const Width = Dimensions.get('window').width;

export default class FavoriteScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            restaurants: [],
            loading: true,
            disabled: false,
            isFavoritePresent: true,
        };
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this.setState({
                restaurants: [],
                loading: true,
                disabled: false,
                isFavoritePresent: true,
            });
            this.fetchData();
        });
    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }


    fetchData(){
        fetch('https://60ffcd6bbca46600171cf51c.mockapi.io/restaurants?favorites=true')
        .then((response) => response.json())
        .then((json) => {
            this.setState({restaurants: json, loading: false});
            if(json.length === 0){
               this.setState({isFavoritePresent: false})
            }
        })
        .catch((error) => {
            console.error(error);
            alert(error);
        });
    }

    deleteFromFavorites(id, favorites){
        this.setState({loader: true, disabled: true})
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favorites: false })
        };
        fetch('https://60ffcd6bbca46600171cf51c.mockapi.io/restaurants/' + id, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("done " + JSON.stringify(data));

                fetch('https://60ffcd6bbca46600171cf51c.mockapi.io/restaurants?favorites=true')
                .then((response) => response.json())
                .then((json) => {
                    this.setState({restaurants: json, loader: false, disabled: false,});
                    if(json.length === 0){
                        this.setState({isFavoritePresent: false})
                     }
                })
                .catch((error) => {
                console.error(error);
                alert(error);
                });
            });

    }

    renderLoader(){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}} >
                <ActivityIndicator size="large" color="red" />
            </View>
        )
    }


    renderRestaurants = ({item}) => {
        return(
            <View style={styles.containerStyle} >
               <View style={styles.container} >
                    <View style={styles.cardStyle} >
                            <Text style={styles.titleStyle} >{item.title}</Text>
                            <TouchableOpacity 
                                disabled={this.state.disabled}
                                onPress={() => this.deleteFromFavorites(item.id, item.favorites)} 
                                style={styles.cardContent} >
                                 {this.state.loader
                                    ?
                                    <View>
                                        <ActivityIndicator size="small" color="red" />
                                    </View>
                                    :
                                        <Heart style={{}} size={18} name={'heart'} color="red" />
                                    }
                            </TouchableOpacity>
                    </View>

                    <View style={styles.imageContainer} >
                        <Image
                            source={{uri: item.image}}
                            style={styles.image}  
                        />
                        <View style={styles.content} >
                            
                            <View style={styles.descriptionContainer} >
                                 <Text style={styles.descriptionStyle} >{item.description}</Text>
                            </View>

                            <View style={styles.ratingContainer} >
                                    <Text style={styles.ratingStyle} >{item.rating}</Text>
                                    <Image
                                        source={require('../assets/star.png')}
                                        style={styles.startImage}  
                                    />
                            </View>

                            <Text style={styles.priceStyle} >{item.price}</Text>
                        </View>
                    </View>
                       
                        
                </View>
            </View>
        )
    }

    renderData(){
        return(
            <View>
                {this.state.isFavoritePresent
                ?
                <View>
                    <View style={styles.heading} >
                        <Text style={{fontSize: 24}} >Favorites</Text>
                    </View>
               
                    <ScrollView style={{marginBottom: 60}} >
                        <FlatList
                            data={this.state.restaurants}
                            renderItem={this.renderRestaurants}
                            keyExtractor={item => item.id}
                        />
                    </ScrollView>
                </View>
                :
                <View style={styles.modal} >
                    <Image
                        source={require('../assets/error.png')}
                        style={{height: 150, width: 200, borderRadius: 4}}
                    />
                    
                    <Text style={{fontSize: 24, color: 'white', marginTop: 10}} >Sorry !!!</Text>
                    <Text style={{fontSize: 20, color: 'white', marginTop: 10}}>You have no Restaurants</Text>
                    <Text style={{fontSize: 20, color: 'white', marginTop: 4}}>added to your favorites</Text>
                </View>
                }
            </View>
        )
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {this.state.loading
                ?
                <View>
                    {this.renderLoader()}
                </View>
                :
                <View>
                    {this.renderData()}
                </View>
                }
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
	containerStyle: {
		borderWidth:  1,
		borderRadius: 20,
		borderColor: '#fff',
		borderBottomWidth: 1.8,
		shadowColor: '#000',
		shadowOffset: {width:0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 10,
        margin: 10,
        backgroundColor: 'white',
    },
    container: {
        margin: 12,
        width: Width-40,
        borderRadius: 20,
        height: 164,
        backgroundColor: 'white',
    },
    modal: {
        height: 300,
        width: Width-100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498DB',
        borderRadius: 8,},
    heading: {
        marginLeft: 20,
        margin: 10,
        marginTop: 20,
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    content: {
         marginLeft: 10,
         borderRadius: 10,
        },
    cardStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleStyle: {
        fontSize: 24
    },
    imageContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    priceStyle: {
        fontSize: 18,
        marginTop: 10,
    },
    startImage: {
        height: 16,
        width: 16,
        borderRadius: 4,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 10,
    },
    descriptionStyle: {
        fontSize: 18,
        color: 'gray',
        marginTop: 10,
    },
    descriptionContainer: {
        width: 180,
    },

    cardContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 10,
        height: 30,
        width: 70,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    ratingStyle: {
        fontSize: 18,
        color: 'white',
        marginRight: 4,
    },
});
