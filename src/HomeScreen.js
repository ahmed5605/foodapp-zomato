/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import {Text, ImageBackground, Dimensions, ScrollView, View,FlatList, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Heart from 'react-native-vector-icons/AntDesign';

const Width = Dimensions.get('window').width;

export class HomeScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            restaurants: [],
            category: [],
            dishesCategory: [],
            count: 0,
            loading: true,
            loader: false,
        };
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            console.log("componentDidMount");
            this.setState({
                restaurants: [],
                category: [],
                dishesCategory: [],
                count: 0,
                loading: true,
                loader: false,
            });
            this.fetchData();
        });
    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }
    

    fetchData(){

        // Restaurants
        this.fetchRestaurants();

        // Category
        this.fetchCategory();

        // DishesCategory
        this.fetchDishesCategory();
    }

    fetchRestaurants(){
        fetch('https://60ffcd6bbca46600171cf51c.mockapi.io/restaurants/')
        .then((response) => response.json())
        .then((json) => {
            //console.log(JSON.stringify(json))
            this.setState({restaurants: json, count: this.state.count + 1});
        })
        .catch((error) => {
        console.error(error);
        alert(error);
        });
    }

    fetchCategory(){
        fetch('https://60ffcd6bbca46600171cf51c.mockapi.io/category/')
        .then((response) => response.json())
        .then((json) => {
           // console.log(JSON.stringify(json))
            this.setState({category: json, count: this.state.count + 1});
        })
        .catch((error) => {
        console.error(error);
        alert(error);
        });
    }

    fetchDishesCategory(){
        fetch('https://60ffcd6bbca46600171cf51c.mockapi.io/dishesCategory/')
        .then((response) => response.json())
        .then((json) => {
            //console.log(JSON.stringify(json))
            this.setState({dishesCategory: json, count: this.state.count + 1});
        })
        .catch((error) => {
        console.error(error);
        alert(error);
        });
    }

    addToFavorites(id, favorites){
        this.setState({loader: true})
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favorites: favorites ? false : true })
        };
        fetch('https://60ffcd6bbca46600171cf51c.mockapi.io/restaurants/'+id, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("done " + JSON.stringify(data));

                fetch('https://60ffcd6bbca46600171cf51c.mockapi.io/restaurants/')
                .then((response) => response.json())
                .then((json) => {
                    this.setState({restaurants: json, loader: false});
                })
                .catch((error) => {
                console.error(error);
                alert(error);
                });
            });


    }

    renderCategory = ({item}) => {
        return(
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryStyle} >{item.name}</Text>
            </View>
        )
    }

    renderDishesCategory = ({item}) => {
        return(
            <View style={styles.dishesContainer}>
                <Image
                    style={{height: 80, width: 80, borderRadius: 40, }}
                    source={{uri: item.image}}
                    />
                <Text style={styles.dishesStyle} >{item.category}</Text>
            </View>
        )
    }

    renderRestaurants = ({item}) => {
        return(
            <View style={styles.containerStyle} >
               <View style={styles.container} >
                    <ImageBackground
                        imageStyle={styles.imageBack}
                        source={{uri: item.image}}
                        style={styles.imageBackStyle}  
                    >
                        <View style={styles.cardContainer} >
                            <TouchableOpacity onPress={() => this.addToFavorites(item.id, item.favorites)} style={styles.cardContent} >
                                    {this.state.loader
                                    ?
                                    <View>
                                        <ActivityIndicator size="small" color="red" />
                                    </View>
                                    :
                                    <>
                                    {item.favorites 
                                        ? 
                                        <Heart style={{}}  size={18} name={'heart'} color="red" />
                                        :
                                        <Heart style={{}}  size={18} name={'hearto'} color="black" />
                                        }
                                    </>
                                    }
                            </TouchableOpacity>
                        </View>

                        <View style={styles.detailContainer} >
                            <View style={styles.discount} >
                                <Text style={{color: 'white', marginLeft: 10 }} >{item.offerDiscount1}</Text>
                                <Text style={{color: 'white', marginLeft: 10 }} >{item.offerDiscount2}</Text>
                            </View>
                            <View style={styles.proDiscountContainer} >
                                <View style={styles.proDiscount} >
                                    <Text style={{color: 'white', }} >{item.proDiscount}</Text>
                                </View>
                                <View style={styles.deliveryTime} >
                                    <Text style={{color: 'Black', }} >{item.deliveryTime}</Text>
                                </View>
                            </View>
                        </View>
                        
                    </ImageBackground>
                    
                    
                    <View style={{margin: 10, marginBottom: 10}} >
                            <View style={styles.titleContainer} >
                                <Text  style={{fontSize: 22}} >{item.title}</Text>
                                <View style={styles.ratingContainer} >
                                    <Text style={styles.ratingStyle} >{item.rating}</Text>
                                    <Image
                                        source={require('../assets/star.png')}
                                        style={{ height: 16, width: 16, borderRadius: 4}}  
                                    />
                                </View>
                            </View>
                            <View style={styles.descriptionContainer} >
                                    <Text  style={{fontSize: 16,color: '#737373'}} >{item.description}</Text>
                                    <Text style={{fontSize: 16,color: '#737373'}} >{item.price}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 5, width: Width-100,  }}  >
                                    <Image
                                        source={require('../assets/maxSafety.png')}
                                        style={{marginRight: 4,marginTop:6, height: 20, width: 40, borderRadius: 4}}  
                                        />
                                    <View style={{}} >
                                        <Text style={{fontSize: 12, color: '#A4A2A4'}} >{item.maxSafety}</Text>
                                    </View>
                            </View>
                    </View>
               </View>
            </View>
        )
    }

    renderData(){
        return(
            
            <View style={{backgroundColor: 'white', marginTop: 40, marginBottom: 150}} >

            <View style={{height: 57, width: Width-30, margin: 20, flexDirection: 'row', alignItems:'center'}} >

                <View style={styles.searchContainer} >
                    <Image
                        style={{marginLeft: 10,height: 30, width: 30}}
                        source={require('../assets/search.png')}
                        />
                    <TextInput
                        style={{marginLeft: 10, fontSize: 16, height: 40}}
                        placeholder="Search"
                    />
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{justifyContent: 'center', alignItems: 'center', marginRight: 20}} >
                    <Image
                            style={{height: 50, width: 50, borderRadius: 25}}
                            source={require('../assets/zaid.jpeg')}
                            />
                </TouchableOpacity>               
             </View>
           


            <View style={{marginLeft: 10, marginRight: 10}} >
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', }}
                data={this.state.category}
                renderItem={this.renderCategory}
                keyExtractor={item => item.id}
            />
            </View>
            

            <ScrollView style={{marginTop: 5,}} >

            <View style={{flexDirection: 'row',  justifyContent: 'space-between', margin: 10}} >
                    <View style={{width: Width/2 - 15,  heigh: 200}} >
                        <Image
                            style={{height: 200, width: Width/2 - 15,borderRadius: 12, }}
                            source={require('../assets/home.png')}
                            />
                    </View>

                    <View style={{width: Width/2 - 15, height: 200}} >
                        <Image
                        style={{height: 200, width: Width/2 - 15,borderRadius: 12, }}
                        source={require('../assets/match.png')}
                        />
                </View>
            </View>

            <View style={{margin:10, height: 80}} >
                    <Image
                        style={{height: 80, width: Width-20,borderRadius: 12, }}
                        source={require('../assets/oxygen.png')}
                    />
            </View>



            <View style={{margin:10,}} >
                <Text style={{fontSize: 24}} >Eat what makes you happy</Text>
            </View>

            <View style={{margin: 10}} >
                <FlatList
                    contentContainerStyle={{flexDirection: 'row',  flexWrap: 'wrap'}}
                    data={this.state.dishesCategory}
                    renderItem={this.renderDishesCategory}
                    keyExtractor={item => item.recipeID}
                />
            </View>

            <View style={styles.seeMoreContainer} >
                <Text style={{fontSize: 14}} >see more</Text>
                <Icon style={{marginTop: 2, marginLeft: 4}}  size={14} name={'down'} />
            </View>

            <View style={{margin:10,}} >
                <Text style={{fontSize: 24}} >336 restaurants around you</Text>
            </View> 

            <View style={{ marginBottom: 0}}>
                <FlatList
                    data={this.state.restaurants}
                    renderItem={this.renderRestaurants}
                    keyExtractor={item => item.id}
                />
            </View>
            </ScrollView>

        </View>
            
        )
    }
    
    renderLoader(){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}} >
                <ActivityIndicator size="large" color="red" />
            </View>
        )
    }

    render() {
        return (
                <ScrollView contentContainerStyle={styles.scrollContainer} >
                        {this.state.count === 3
                        ?
                        <View>
                            {this.renderData()}
                        </View>
                        :
                        <View>
                            {this.renderLoader()}
                        </View>
                        }
                </ScrollView>


        )
    }
}


const styles =  StyleSheet.create({
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
        margin: 10
    },
    container: {
        borderRadius: 20, 
        height: 310, 
        backgroundColor: 'white',
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
},
    imageBack: { 
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20
    },
    imageBackStyle: { 
        height: 200, 
        width: Width-20
    },
    cardContent: {
        backgroundColor: 'white', 
        borderRadius: 15, 
        height: 30, 
        width: 30, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    cardContainer: {
        alignItems: 'flex-end', 
        margin: 10, 
    },
    detailContainer: {
        justifyContent:'flex-end', 
        flex: 1,
    },
    discount: { 
        backgroundColor: '#4E8AEE',
        justifyContent: 'center', 
        alignItems: 'flex-start',
        height: 50, 
        width: 100, 
        borderTopRightRadius: 10, 
        borderBottomRightRadius: 10
    },
    proDiscountContainer: {
        margin: 10,
        marginLeft: 0, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    proDiscount: {
        backgroundColor: '#ED4A5C', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 30, 
        width: 140, 
        borderTopRightRadius: 10, 
        borderBottomRightRadius: 10
    },
    deliveryTime: {
        backgroundColor: '#CCCCCC',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 30, 
        width: 60, 
        borderRadius: 4,
    },
    ratingContainer: {
        flexDirection: 'row', 
        height: 30,
        width: 70, 
        borderRadius: 8, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'green'
    },
    ratingStyle: {
        fontSize: 18, 
        color: 'white', 
        marginRight: 4
    },
    titleContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    descriptionContainer: {
        marginTop: 5, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    categoryContainer: {
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderColor: 'gray', 
        borderRadius: 10, 
        borderWidth: 1, 
        margin: 4
    },
    categoryStyle: {
        margin: 4,
        marginRight: 12, 
        marginLeft: 12, 
        fontSize: 14
    },
    dishesContainer: { 
        justifyContent: 'center', 
        alignItems: 'center',  
        borderRadius: 10, 
        margin: 5
    },
    dishesStyle: {
        margin: 4,
        marginRight: 12,
        marginLeft: 12, 
        fontSize: 14
    },
    searchContainer: {
        flexDirection: 'row',
        borderColor: 'gray', 
        borderWidth:1 , 
        borderRadius: 12,
        justifyContent: 'flex-start', 
        alignItems:'center',
        margin: 10,
        height: 50,
        marginLeft: 0,
        width: Width-100,
    },
    seeMoreContainer: {
        margin: 10,
        height: 30, 
        borderRadius: 2 , 
        borderWidth: 0.1, 
        borderColor:'gray', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
});


export default HomeScreen;