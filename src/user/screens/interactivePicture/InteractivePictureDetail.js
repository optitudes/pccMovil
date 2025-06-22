import {Text} from 'native-base';
import React, {  useState, useEffect,useContext } from 'react';
import {  SafeAreaView,View, ScrollView, TouchableNativeFeedback, TouchableOpacity,StyleSheet, TextInput } from "react-native";
import ImageView from '../../../components/ImageView';
import LoadingSpinner from '../../../components/LoadingSpinner';
import httpClient from '../../../config/httpClient';
import Toast from 'react-native-toast-message';
import {  Icon } from "react-native-elements";
import colors from '../../../constants/colors';
import authContext from '../../../context/authContext';
const InteractivePictureDetail = ({route, navigation }) => {
    const { authenticated, userInfo} = useContext(authContext);

    const idPicture = route.params.idPicture??-1;

    const [isLoading, setIsLoading] = useState(false);

    const [answers, setAnswers] = useState([]);

    const [showAnswers, setShowAnswers] = useState(false);

    const [linkPicture,setLinkPicture] = useState('https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif');

    const [titlePicture,setTitlePicture] = useState('');

    const [descPicture,setDescPicture] = useState('');

    const [questions,setQuestions] = useState([]);

    const [pagination, setPagination] = useState({
      current_page: 1,
      last_page: 1,
    });

    const [showAnswerForm, setShowAnswerForm] = useState(false);

    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    const [newAnswer, setNewAnswer] = useState('');


    useEffect(() => {
          updatePicture();
        }, []);
    
    //metoo que obtiene los proyectos con la palabra
    const updatePicture = async () => {
            try {
                setIsLoading(true);
                const res = await httpClient.get("/interactive_picture/get/"+idPicture);
                let pictureObtained = res.data.data;
                setLinkPicture(pictureObtained.link);
                setTitlePicture(pictureObtained.title);
                setDescPicture(pictureObtained.description)
                setQuestions(pictureObtained.questions ?? []);
            } catch (error) {
                console.log("Error:", error.message); // Imprimir el mensaje de error
                console.log("Stack Trace:", error.stack);
            } finally {
              setIsLoading(false)
            }
    };


    const loadAnswers = async (page = 1) => {
      try {
        setIsLoading(true);
        const res = await httpClient.get(`/interactive_picture_answers/getByInteractivePictureId/${idPicture}?page=${page}`);
        if (res.data.success) {
          setAnswers(res.data.data.data ?? []);
          setPagination({
            current_page: res.data.data.current_page,
            last_page: res.data.data.last_page,
          });
          setShowAnswers(true);
        } else {
          Toast.show({
            type: "error",
            text1: "Error al cargar respuestas",
            text2: res.data.message,
            style: styles.toastStyle,
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: error.message,
          style: styles.toastStyle,
        });
      } finally {
        setIsLoading(false);
      }
    };


    const deletePicture = async () => {
      const formData = new FormData();
      formData.append('id', idPicture);

      try {

      setIsLoading(true);
      const res = await httpClient.post("/interactive_picture/remove", formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    });

      // Realizar cualquier acción necesaria con la respuesta del servidor
      if(res.data.success){
        navigation.reset({
          index: 0, // Establecer el índice del historial en 0 (primera pantalla)
          routes: [{ name: "start" }], // Definir la nueva vista como la primera
        });
        //navigation.popToTop();
      }else{
        Toast.show({
          type:"error",
          text1: "Error!",
          text2: res.data.message,
                autoHide: false,
                style: styles.toastStyle, // Aplicamos el estilo personalizado
        });
      }
      } catch (error) {
      Toast.show({
        type:"error",
        text1: "Error!",
        text2: error.message,
                autoHide: false,
                style: styles.toastStyle, // Aplicamos el estilo personalizado
      });
      // Manejar errores si es necesario
      }
      setIsLoading(false);
  };

    return (
        <SafeAreaView style={styles.container}>
          <LoadingSpinner isVisible={isLoading} text="Cargando..." />
             <View style={styles.wrapper}>
                <View style={styles.pictureContainer}>
                  {/* Picture  */}
                    <ImageView imageUrl={linkPicture}/> 
                </View>
                <Text style={styles.title}>{titlePicture} </Text>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.textContainer}>
                    {/* Título */}
                    {/* Descripción */}
                    <Text style={styles.description}>{descPicture}</Text>
                  </View>
                  
                <View style={styles.questionsWrapper}>
                  <Text style={styles.questionsTitle}>Preguntas</Text>
                  {questions.length === 0 ? (
                    <Text style={styles.noQuestionsText}>No hay preguntas disponibles.</Text>
                  ) : (
                    questions.map((q) => (
                      <View key={q.id} style={styles.questionItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.questionText}>{q.question}</Text>
                      </View>
                    ))
                  )}
                </View>
               
            {authenticated && userInfo.userType.levelAccess == 0  && (
                <TouchableOpacity
                  style={styles.addAnswerButton}
                  onPress={() => setShowAnswerForm(!showAnswerForm)}
                >
                  <Text style={styles.showAnswersButtonText}>
                    {showAnswerForm ? 'Cancelar' : 'Agregar respuesta'}
                  </Text>
                </TouchableOpacity>
            )}

                {showAnswerForm && (
                  <View style={styles.answerForm}>
                    <Text style={styles.questionsTitle}>Selecciona una pregunta</Text>
                    {questions.map((q) => (
                      <TouchableOpacity
                        key={q.id}
                        style={[
                          styles.questionOption,
                          selectedQuestionId === q.id && styles.selectedQuestion,
                        ]}
                        onPress={() => setSelectedQuestionId(q.id)}
                      >
                        <Text style={styles.questionText}>{q.question}</Text>
                      </TouchableOpacity>
                    ))}

                    <Text style={{ marginTop: 10 }}>Tu respuesta (máx. 400 caracteres):</Text>

                    <TextInput
                      style={styles.answerInput}
                      multiline
                      maxLength={400}
                      value={newAnswer}
                      onChangeText={setNewAnswer}
                      placeholder="Escribe tu respuesta aquí"
                    />

                    <TouchableOpacity
                      style={styles.showAnswersButton}
                      onPress={async () => {
                        if (!selectedQuestionId || newAnswer.trim() === '') {
                          Toast.show({
                            type: 'error',
                            text1: 'Campos requeridos',
                            text2: 'Selecciona una pregunta y escribe una respuesta.',
                          });
                          return;
                        }

                        try {
                          setIsLoading(true);
                          const formData = new FormData();
                          formData.append('question_id', selectedQuestionId);
                          formData.append('answer', newAnswer);

                          const res = await httpClient.post('/interactive_picture_answers/create', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                          });

                          if (res.data.success) {
                            Toast.show({ type: 'success', text1: 'Respuesta agregada' });
                            setNewAnswer('');
                            setSelectedQuestionId(null);
                            setShowAnswerForm(false);
                            loadAnswers(); // Refrescar respuestas
                          } else {
                            throw new Error(res.data.message);
                          }
                        } catch (error) {
                          Toast.show({ type: 'error', text1: 'Error', text2: error.message });
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    >
                      <Text style={styles.showAnswersButtonText}>Enviar respuesta</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.showAnswersButton}
                  onPress={() => {
                    if (showAnswers) {
                      setShowAnswers(false); // Ocultar respuestas
                    } else {
                      loadAnswers(); // Mostrar respuestas
                    }
                  }}
                >
                  <Text style={styles.showAnswersButtonText}>
                    {showAnswers ? 'Ocultar respuestas' : 'Mostrar respuestas'}
                  </Text>
                </TouchableOpacity>


                {showAnswers && (
                  <View style={styles.answersWrapper}>
                    <Text style={styles.questionsTitle}>Respuestas</Text>
                    {answers.length === 0 ? (
                      <Text style={styles.noQuestionsText}>No hay respuestas disponibles.</Text>
                    ) : (
                      answers.map((a) => (
                        <View key={a.id} style={styles.answerItem}>
                          <Text style={styles.answerText}>🗨 {a.answer}</Text>
                          <Text style={styles.answerAuthor}>Por: {a.author?.name ?? a.author_email}</Text>
                        </View>
                      ))
                    )}
                  </View>
                )}


                {pagination.last_page > 1 && showAnswers && (
                  <View style={styles.paginationWrapper}>
                    <TouchableOpacity
                      style={[styles.pageButton, pagination.current_page === 1 && styles.disabledButton]}
                      onPress={() => loadAnswers(pagination.current_page - 1)}
                      disabled={pagination.current_page === 1}
                    >
                      <Text style={styles.pageButtonText}>Anterior</Text>
                    </TouchableOpacity>
                    <Text style={styles.currentPageText}>{pagination.current_page} / {pagination.last_page}</Text>
                    <TouchableOpacity
                      style={[styles.pageButton, pagination.current_page === pagination.last_page && styles.disabledButton]}
                      onPress={() => loadAnswers(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.last_page}
                    >
                      <Text style={styles.pageButtonText}>Siguiente</Text>
                    </TouchableOpacity>
                  </View>
                )}
                </ScrollView>

            </View>

            {authenticated && userInfo.userType.levelAccess == 0  && (
            <>
          <TouchableOpacity style={styles.floatingLeftButton} onPress={deletePicture}>
              <Icon
              name={"delete-outline"}
              color={colors.SECUNDARY1}
              size={24}
              type="material-community"
            />
          </TouchableOpacity>
         </>
          )}
          <Toast />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 16, // Margen general de los bordes
    },
    wrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.PRIMARY1,
        borderRadius: 10,
        padding: 8,
      },
    pictureContainer: {
     flex:1,
    },

    scrollView: {
      flex: 1,
    },
    textContainer: {
      padding: 10, // Espacio interno del contenedor de texto
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center', // Centrar el texto del título
      color: colors.PRIMARY1,
      marginBottom: 16, // Margen inferior del título
    },
    description: {
      fontSize: 16,
      textAlign: 'center', // Centrar el texto de la descripción
    },
    floatingRightButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: colors.QUINARY1,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    floatingLeftButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: colors.REPROVED1,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    questionsWrapper: {
        marginTop: 20,
        paddingHorizontal: 10,
      },
  questionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.primary || '#000',
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bullet: {
    width: 8,
    height: 8,
    backgroundColor: colors.primary || '#555',
    borderRadius: 4,
    marginTop: 6,
    marginRight: 10,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  noQuestionsText: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
showAnswersButton: {
  marginVertical: 10,
  backgroundColor: colors.PRIMARY1,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
},

showAnswersButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

answersWrapper: {
  marginTop: 20,
  paddingHorizontal: 10,
},

answerItem: {
  backgroundColor: '#e8f0ff',
  borderRadius: 8,
  padding: 10,
  marginBottom: 8,
},

answerText: {
  fontSize: 15,
  color: '#333',
  marginBottom: 4,
},

answerAuthor: {
  fontSize: 13,
  color: '#666',
  fontStyle: 'italic',
},

    paginationWrapper: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 12,
},

pageButton: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  backgroundColor: colors.PRIMARY1,
  borderRadius: 6,
  marginHorizontal: 10,
},

disabledButton: {
  backgroundColor: '#ccc',
},

pageButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},

currentPageText: {
  fontSize: 16,
  color: '#333',
},

addAnswerButton: {
  backgroundColor: colors.PRIMARY1 , // Transparente
  paddingVertical: 10,
  marginVertical: 10,
  borderRadius: 8,
  alignItems: 'center',
},
answerForm: {
  marginTop: 20,
  backgroundColor: '#f5f5f5',
  padding: 15,
  borderRadius: 10,
},
questionOption: {
  padding: 10,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#ccc',
  marginVertical: 5,
},
selectedQuestion: {
  backgroundColor: colors.PRIMARY1 + '33', // Transparente
  borderColor: colors.PRIMARY1,
},
answerInput: {
  height: 100,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  padding: 10,
  marginTop: 10,
  backgroundColor: '#fff',
  textAlignVertical: 'top',
},

  });
export default InteractivePictureDetail;
