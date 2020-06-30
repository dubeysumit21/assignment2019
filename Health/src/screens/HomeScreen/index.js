import React from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import styles from './styles';
import Intensity from '../../components/Intensity';
import ServiceTile from '../../components/ServiceTile';
import FormField from '../../components/FormField';
import CustomService from '../../components/CustomService';
import NavigationTile from '../../components/NavigationTile';
import Popup from '../../components/Popup';
import custom from '../../assets/menu.png';
import data from './data';
import customData from './customData';
import footerData from './footerData';
import headerData from './headerData';
import formData from './formData';

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            services: [ ...data ],
            activeService: '',
            footerConfig: [ ...footerData ],
            customServices: [ ...customData ],
            customServiceFlag: false,
            formPageFlag: false,
            newCustomService: {
                text: '', 
                image: custom, 
                id: '',
                selected: false, 
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                type: ['NEAR', 'FAR'], 
                time: '',
            },
            popupFlag: false,
        };
    };

    headerConfig=[ ...headerData ];

    formConfig=[ ...formData ];

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
        this.setState({ services: tempServices, activeService: item, customServiceFlag: false, formPageFlag: false });
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
                            key={`${as}-${activeService.text}`}
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

    openCustomServiceForm = () => {
        this.setState({ formPageFlag: true });
    }

    changeTextHandler = (value, type) => {
        const { newCustomService } = this.state;
        const tempNewCustomService = { ...newCustomService };
        if (type === 21) {
            tempNewCustomService.text = value; 
        } else {
            tempNewCustomService.time = value; 
        }
        this.setState({ newCustomService : tempNewCustomService });
    }

    saveDataToLocalHandler = () => {
        const { customServices, newCustomService } = this.state;
        const newCustomServices = [ ...customServices ];
        newCustomServices.push({ ...newCustomService });
        this.setState({ customServices : newCustomServices, formPageFlag : false });
    };

    startProgramHandler = () => {
        this.setState({ popupFlag: true });
    }

    getBodyTypeContent = () => {
        const { activeService, customServices, customServiceFlag, formPageFlag } = this.state;
        if (formPageFlag) {
            return(
                <View style={styles.formCustomMainWrapper}>
                    {this.formConfig 
                        && this.formConfig.map(f => 
                        <FormField 
                            key={`${f.id}`}
                            item={f} 
                            changeTextHandler={this.changeTextHandler}
                            customStyle={styles.inputField}
                        />
                    )}
                    <Button style={styles.startButton} onPress={this.saveDataToLocalHandler}>
                        <Text style={styles.buttonText}>Save & Customize Heaters</Text>
                    </Button>
                </View>
            );
        }
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
                    <Button style={styles.startButton} onPress={() => this.startProgramHandler()}>
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
                        {customServices 
                            && customServices.map(cs => 
                            <CustomService 
                                key={`${cs.id}`}
                                item={cs} 
                                setCustomContent={this.setCustomContent}
                                customStyle={styles.customTileWrapper}
                                imageStyle={styles.activeServiceImage}
                            />
                        )}
                    </ScrollView>
                    <Button style={styles.addButton} onPress={this.openCustomServiceForm}>
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
                <Button style={styles.startButton} onPress={() => this.startProgramHandler()}>
                    <Text style={styles.buttonText}>Start Program</Text>
                </Button>
                ) : null }
            </View>
        );
    };

    render(){
        const { footerConfig, popupFlag } = this.state;
        return(
            <View style={{ justifyContent: 'center' }}>
                <View style={styles.headerWrapper}>
                    {this.headerConfig 
                        && this.headerConfig.map(icon => <Image key={icon.id} source={icon.image} style={icon.styles} />)}
                </View>
                <View style={styles.headingWrapper}>
                    {popupFlag ?  
                        <Popup 
                            closePopup={() => this.setState({ popupFlag: false })}
                            popupStyle={styles.popupWrapper}
                            popupTextStyle={styles.popupText}
                            popupButtonStyle={styles.startButton}
                            popButtonText={styles.buttonText}
                        /> : 
                        null
                    }
                    <Text style={styles.headingText}>Programs</Text>
                    {this.getServiceTiles()}
                    {this.getBodyTypeContent()}
                </View>
                <View style={styles.footerWrapper}>
                {footerConfig 
                        && footerConfig.map(icon => 
                            <NavigationTile 
                                key={`${icon.text}-${icon.id}`}
                                icon={icon}
                                presentScreenHandler={this.presentScreenHandler}
                                customStyle={styles.footerTiles}
                                imageStyle={icon.styles}
                                textStyle={styles.footerText}
                            />
                        )}
                </View>
            </View>
        );
    }
};

export default HomeScreen;