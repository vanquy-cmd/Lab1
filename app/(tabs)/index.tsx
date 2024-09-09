import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform, StatusBar, useWindowDimensions } from 'react-native';

const App = () => {
  const { width, height } = useWindowDimensions(); // Sử dụng useWindowDimensions để lấy kích thước màn hình
  const [isPortrait, setIsPortrait] = useState(height >= width);

  useEffect(() => {
    setIsPortrait(height >= width); // Cập nhật trạng thái hướng khi kích thước màn hình thay đổi
  }, [width, height]);

  const imageWidth = width * 0.8;
  const imageHeight = isPortrait ? imageWidth * (9 / 16) : imageWidth * (3 / 8);

  // Tùy chỉnh màu nền và kiểu chữ của thanh trạng thái
  const statusBarStyle = isPortrait ? 'dark-content' : 'light-content';
  const statusBarBackgroundColor = Platform.select({
    ios: isPortrait ? '#ffffff' : '#000000',
    android: isPortrait ? '#ffffff' : '#000000',
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
      />

      <View style={[styles.buttonContainer, { flexDirection: isPortrait ? 'column' : 'row' }]}>
        <TouchableOpacity style={[styles.button, { width: isPortrait ? width : width / 3, height: 60 }]}>
          <Text style={styles.buttonText}>Nút 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { width: isPortrait ? width : width / 3, height: 60 }]}>
          <Text style={styles.buttonText}>Nút 2</Text>
        </TouchableOpacity>
      </View>

      {/* Trường nhập liệu */}
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung ở đây"
        keyboardType="default"
      />

      {/* Hình ảnh */}
      <Image 
        source={{ uri: 'https://funface.vn/wp-content/uploads/2023/08/mo-hinh-one-piece-luffy-gear-5-1024x683.jpg' }}
        style={{ width: imageWidth, height: imageHeight }}
        resizeMode="contain" 
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: Platform.select({ ios: 20, android: 10 }),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    padding: Platform.select({ ios: 12, android: 8 }),
  },
});

export default App;