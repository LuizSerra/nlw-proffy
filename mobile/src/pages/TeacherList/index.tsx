import React, { useState } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import styles from './styles';
import api from "../../services/api";
import AsyncStorage from "@react-native-community/async-storage";


function TeacherList() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const [subject, setSubject] = useState(' ');
    const [week_day, setWeekDay] = useState(' ');
    const [time, setTime] = useState(' ');

    const [teachers, setTeachers] = useState([]);
    const [favorites, setfavorites] = useState<number[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                }); 
                setfavorites(favoritedTeachersIds);
            }
        });
    }


    function handleToggleFiltersVisible() {
       setIsFilterVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        setIsFilterVisible(false);
        console.log({
            subject,
            week_day,
            time
        });
    }


    return (
        <View style={styles.container} >
            <PageHeader title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" color="#FFF" size={20} />
                    </BorderlessButton>
                )}>
                {isFilterVisible && (
                    <View style={styles.searchForm} >
                        <Text style={styles.label} >Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            onChangeText={text => setSubject(text)}>
                        </TextInput>
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label} >Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}>
                                </TextInput>
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label} >Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    onChangeText={text => setTime(text)}>
                                </TextInput>
                            </View>
                        </View>
                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }} >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)}/>

                    );
                })}

            </ScrollView>
        </View>
    );
}

export default TeacherList;