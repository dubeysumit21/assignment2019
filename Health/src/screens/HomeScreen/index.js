import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import User from '../../assets/user.png';
import Logo from '../../assets/flower.png';
import Cart from '../../assets/buy.png';
import data from './data';
import Intensity from '../../components/Intensity';
import ServiceTile from '../../components/ServiceTile';
import Sun from '../../assets/sun.png';
import newMenu from '../../assets/newMenu.png';
import newUser from '../../assets/newUser.png';
import whiteCart from '../../assets/whiteCart.png';
import Rose from '../../assets/Rose.png';


class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            services: [ ...data ],
            activeService: '',
        };
    }

    headerConfig=[
        { image: User, id: 1, styles: styles.headerImage },
        { image: Logo, id: 2, styles: styles.headerLogo },
        { image: Cart, id: 3, styles: styles.headerImage },
    ];

    footerConfig=[
        { image: Rose, id: 1, styles: styles.footerImage, text: 'HOME' },
        { image: newMenu, id: 2, styles: styles.footerImage, text: 'SAUNA' },
        { image: Sun, id: 3, styles: styles.footerImage, text: 'ENHNACE' },
        { image: newUser, id: 4, styles: styles.footerImage, text: 'SOCIAL' },
        { image: whiteCart, id: 5, styles: styles.footerImage, text: 'SHOP' },
    ];

    selectServiceHandler = item => {
        const { services } = this.state;
        const tempServices = services.map(ser => {
            if (ser.id === item.id) {
                return {
                    ...ser,
                    selected: true,
                };
            } else { 
                return {
                    ...ser,
                    selected: false,
                };
            }
        });
        this.setState({ services: tempServices, activeService: item });
    }

    getIntensityInformation = () => {
        const { activeService } = this.state;
        return (
            <View style={styles.intensityWrapper}>
                {activeService.type && activeService.type.map(as => {
                    return (
                        <Intensity
                            key={`${as.text}-${as.id}`}
                            item={as} 
                            customStyle={styles.individualIntensity}
                            textStyle={styles.intensityText}
                        />
                    );
                })}
            </View>
        );
    };

    getServiceTiles = () => {
        const { services } = this.state;
        return (
            <FlatList 
                style={styles.flatlistTile}
                contentContainerStyle={styles.flatlist}
                data={services}
                renderItem={({ item }) => {
                    return (
                        <ServiceTile 
                            selectServiceHandler={item => this.selectServiceHandler(item)}
                            item={item}
                            customStyle={styles.tiles}
                            imageStyle={styles.images}
                        />
                    );
                }}
                keyExtractor={item => `${item.name}-${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        );
    };

    render(){
        const { activeService } = this.state;
        return(
            <View>
                <View style={styles.headerWrapper}>
                    {this.headerConfig 
                        && this.headerConfig.map(icon => <Image key={icon.id} source={icon.image} style={icon.styles} />)}
                </View>
                <View style={styles.headingWrapper}>
                    <Text style={styles.headingText}>Programs</Text>
                    {this.getServiceTiles()}
                    <View style={styles.activeServiceHeading}>
                        <Image source={activeService.image} style={styles.activeServiceImage} />
                        <Text style={{ ...styles.headingText, fontSize: 24, marginTop: 1, fontWeight: 'bold' }}>{activeService.text}</Text>
                        <Text style={styles.activeDesc}>{activeService.desc}</Text>
                        <View style={styles.infoWrapper}>
                            {this.getIntensityInformation()}
                            <Text style={styles.activeServiceTime}>{activeService.time}</Text>
                        </View>
                        {activeService ? (
                        <Button style={styles.startButton}>
                            <Text style={styles.buttonText}>Start Program</Text>
                        </Button>
                        ) : null }
                    </View>
                </View>
                <View style={styles.footerWrapper}>
                {this.footerConfig 
                        && this.footerConfig.map(icon => {
                            return(
                                <View style={styles.footerTiles}>
                                    <Image key={icon.id} source={icon.image} style={icon.styles} />
                                    <Text style={styles.footerText}>{icon.text}</Text>
                                </View>
                                
                            );
                        })}
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerLogo: { width: 60, height: 60 },
    headerImage: { width: 40, height: 40, marginTop: 8 },
    headerWrapper:{ paddingVertical: 10, paddingHorizontal: 20, width: '100%', justifyContent: 'space-between', flexDirection: 'row', height: '12%' },
    headingWrapper: { backgroundColor: '#F9C18B', height: '76%' },
    headingText: { color: '#8B5D2E', fontSize: 30, textAlign: 'center', width: '100%' },
    flatlist: { height: 90, marginTop: 10 },
    tiles: { paddingVertical: 5, alignItems: 'center', width: 100, justifyContent: 'space-around', marginHorizontal: 8 },
    images: { width: 55, height: 55, marginBottom: 8 },
    activeServiceHeading: { backgroundColor: '#F9C18B', width: '100%', alignItems: 'center', paddingBottom: 15 },
    activeServiceImage: { opacity: 0.4, width: 100, height: 100 },
    activeDesc: { width: '100%', color: '#8B5D2E', textAlign: 'center', fontSize: 17 },
    infoWrapper:{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' },
    intensityWrapper: { justifyContent: 'space-around', flexDirection: 'row' },
    individualIntensity: { justifyContent: 'center', alignItems: 'center', width: 50, height: 50, marginHorizontal: 15 },
    activeServiceTime: { fontWeight: 'bold', textAlign: 'center', fontSize: 40, color: '#8B5D2E' },
    intensityText: { fontSize: 16, color: '#8B5D2E', marginTop: 10 },
    startButton: { marginTop: 10, backgroundColor: '#7f4307', width: 340, borderRadius: 40, height: 60 },
    buttonText: { color: '#FFFFFF', width: '100%', textAlign: 'center', fontSize: 24 },
    flatlistTile: { alignSelf: 'center', width: 350 },
    footerWrapper:{ paddingHorizontal: 8, backgroundColor: '#7f4307', paddingVertical: 10, width: '100%', justifyContent: 'space-between', flexDirection: 'row', height: '12%' },
    footerText: { paddingTop: 3, fontSize: 11, color: '#FFFFFF', textAlign: 'center', width: '100%' },
    footerTiles: { justifyContent: 'center', alignItems: 'center' },
    footerImage: { width: 35, height: 35, marginTop: 8 },
});

export default HomeScreen;