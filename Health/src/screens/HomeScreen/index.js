import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
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
import custom from '../../assets/menu.png';
import customData from './customData';


class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            services: [ ...data ],
            activeService: '',
            footerConfig: [
                { image: Rose, id: 1, styles: styles.footerImage, text: 'HOME', selected: false, },
                { image: newMenu, id: 2, styles: styles.footerImage, text: 'SAUNA', selected: true, },
                { image: Sun, id: 3, styles: styles.footerImage, text: 'ENHNACE', selected: false, },
                { image: newUser, id: 4, styles: styles.footerImage, text: 'SOCIAL', selected: false, },
                { image: whiteCart, id: 5, styles: styles.footerImage, text: 'SHOP', selected: false, },
            ],
            customServices: [ ...customData ],
            customServiceFlag: false,
        };
    }

    headerConfig=[
        { image: User, id: 1, styles: styles.headerImage },
        { image: Logo, id: 2, styles: styles.headerLogo },
        { image: Cart, id: 3, styles: styles.headerImage },
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
        this.setState({ services: tempServices, activeService: item, customServiceFlag: false });
    }

    presentScreenHandler = item => {
        const { footerConfig } = this.state;
        const newFooterConfig = footerConfig.map(foo => {
            if (foo.id === item.id) {
                return {
                    ...foo,
                    selected: true,
                };
            } else { 
                return {
                    ...foo,
                    selected: false,
                };
            }
        });
        this.setState({ footerConfig : newFooterConfig });
    };

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

    setCustomContent = item => {
        this.setState({ activeService: { ...item }, customServiceFlag: true });
    };

    getBodyTypeContent = () => {
        const { activeService, customServices, customServiceFlag } = this.state;
        if (customServiceFlag) {
            return(
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
            );
        }
        if (activeService.text === 'CUSTOM') {
            return(
                <View style={styles.customMainWrapper}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {customServices && customServices.map(cs => {
                            return (
                                <TouchableOpacity style={styles.customTileWrapper} onPress={() => this.setCustomContent(cs)}>
                                    <Image source={cs.image} style={styles.activeServiceImage} />
                                    <Text>{cs.text}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                    <Button style={styles.addButton}>
                        <Text style={styles.buttonText}>+</Text>
                    </Button>
                </View>
            );
        }
        return(
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
        );
    };

    render(){
        const { footerConfig } = this.state;
        return(
            <View>
                <View style={styles.headerWrapper}>
                    {this.headerConfig 
                        && this.headerConfig.map(icon => <Image key={icon.id} source={icon.image} style={icon.styles} />)}
                </View>
                <View style={styles.headingWrapper}>
                    <Text style={styles.headingText}>Programs</Text>
                    {this.getServiceTiles()}
                    {this.getBodyTypeContent()}
                </View>
                <View style={styles.footerWrapper}>
                {footerConfig 
                        && footerConfig.map(icon => {
                            return(
                                <TouchableOpacity onPress={() => this.presentScreenHandler(icon)} style={{ ...styles.footerTiles, backgroundColor: icon.selected ? '#D2A476' : null }}>
                                    <Image key={icon.id} source={icon.image} style={icon.styles} />
                                    <Text style={styles.footerText}>{icon.text}</Text>
                                </TouchableOpacity>   
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
    footerText: { paddingTop: 3, fontSize: 11, color: '#FFFFFF', textAlign: 'center', width: '100%', marginBottom: 5 },
    footerTiles: { justifyContent: 'center', alignItems: 'center', padding: 4, width: 60, height: 60, borderRadius: 3 },
    footerImage: { width: 35, height: 35, marginTop: 8 },
    addButton: { marginTop: 10, backgroundColor: '#7f4307', width: 70, borderRadius: 35, height: 70, alignSelf: 'center' },
    customMainWrapper: { height: 300, position: 'relative', bottom: 40 },
    scrollContent: { justifyContent: 'space-evenly', flexDirection: 'row', flexWrap: 'wrap' },
    customTileWrapper: { borderRadius: 5, padding: 8, backgroundColor: '#D2A476', justifyContent: 'center', alignItems: 'center', marginTop: 20, width: '30%', height: 120 },
});

export default HomeScreen;