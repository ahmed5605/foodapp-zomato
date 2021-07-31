/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import {Text, Dimensions, View, Platform, StyleSheet, Image, Linking, TouchableOpacity, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const Width = Dimensions.get('window').width;

const REMOTE_PDF_PATH = 'https://drive.google.com/file/d/1lXUr62CtIn5f2iNqGzRTKIjcWy_PC2y-/view?usp=sharing'
const REMOTE_IMAGE_PATH =  'https://drive.google.com/file/d/1hIZH0ebMablebS5uf1bNwq1iHEQLiiuS/view?usp=sharing'

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
            
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    checkPermission = async () => {
        console.log("check");
        if (Platform.OS === 'ios') {
            this.downloadImage();
        } else {
            try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                title: 'Storage Permission Required',
                message:
                    'App needs access to your storage to download Photos',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage Permission Granted.');
                this.downloadImage();
            } else {
                alert('Storage Permission Not Granted');
            }
            } catch (err) {
            console.warn(err);
            }
        }
    };

    downloadImage = () => {
        console.log("downloadImage");
        let date = new Date();
        let image_URL = REMOTE_PDF_PATH;
        // Getting the extention of the file
        var ext = this.getExtention(image_URL);
        ext = '.' + ext[0];
        const { config, fs, } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              '/pdf_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
            description: 'PDf',
          },
        };
        config(options)
          .fetch('GET', image_URL)
          .then(res => {
            console.log('res -> ', JSON.stringify(res));
            alert('PDF Downloaded Successfully.');
          })
          .catch(err => {
            console.log('err -> ', err);
            alert('PDF Downloaded Successfully.');
          })
      };

    getExtention = filename => {
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
    };


    render() {
        return (
            <View style={styles.container} >
                <View style={styles.innerContainer} >
                        <Text style={styles.heading} >Profile</Text>


                        <View style={styles.cardStyle} >
                            <Image
                                source={require('../assets/zaid.jpeg')}
                                style={styles.imageStyle}
                            />
                            <Text style={styles.nameStyle} >Zaid Ahmed</Text>
                            <Text style={styles.emailStyle} >mailtozaidii@gmail.com</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={()  => this.checkPermission()} 
                                style={styles.buttonStyle}
                            >
                                <Text  style={styles.buttonText} >Download PDF</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={ ()=>{ Linking.openURL(REMOTE_IMAGE_PATH)}}
                                style={styles.buttonStyle}
                            >
                                <Text  style={styles.buttonText} >View PDF</Text>
                            </TouchableOpacity>
                        </View>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
    },
    innerContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'},
    heading: {
        fontSize: 30,
        color: 'black',
    },
    cardStyle: {
        backgroundColor: '#3498DB',
        marginTop: 50,
        height: 200,
        width: Width - 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        height: 80,
        width: Width - 40,
        marginTop: 50,
        borderRadius: 8,
        backgroundColor: '#3498DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 22,
        color: 'white',
    },
    nameStyle: {
        fontSize: 26,
        color: 'white',
    },
    emailStyle: {
        fontSize: 18,
        color: '#D0D3D4',
    },
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
});