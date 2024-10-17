import { ActivityIndicator, View, Text } from "react-native";
import WebView from "react-native-webview";
import { runFirst } from '@/scripts/runFirst';
import { StyleSheet } from "react-native";
import { MAP } from "@/constants/enum";
import { useState } from "react";
import colors from "@/constants/colors";

/**
 * Component: Map
 * 
 * This component renders a full-screen map view with a loading indicator
 * and error handling. The map view is rendered using the react-native-webview
 * library.
 * 
 * @returns {JSX.Element} The rendered map view
 */

export function MapLoading ({error, loading}: any) {

    if (!error && loading) {
        return (
            <View style={loadingStyles.container}>
                <ActivityIndicator 
                style={loadingStyles.loader}
                size="large" />
            </View>
        )
    }

    return (<></>)
}

export function Map() {
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const handleWebViewLoadStart = () => {
    //   console.log("Loading...");
      setLoading(true);
      setError(false);
    };
  
    const handleWebViewLoadEnd = () => {
    //   console.log("End Loading");
      setLoading(false);
    };
  
    const handleWebViewError = () => {
    //   console.log("Error");
      setLoading(false);
      setError(true);
    };

    if (error) {
        return (
            <View style={errorStyles.container}>
                <Text style={errorStyles.title}>Failed to load the page</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* <MapLoading error={error} loading={loading} /> */}
            <WebView
                style={{ flex: 1 }}
                source={{ uri: MAP.URL }}
                onMessage={(event) => {}}
                injectedJavaScript={runFirst}
                allowFileAccess={true}
                scalesPageToFit={true}
                originWhitelist={['*']}
                onLoadStart={handleWebViewLoadStart}
                onLoadEnd={handleWebViewLoadEnd}
                onError={handleWebViewError}
            />
        </View>
    )
    
}

export default function MapView({ children }: any) {
    return (
        <View style={styles.container}>
            <Map />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.grey,
  },
  loader: {
    position: 'absolute',
    top: 400,
    left: 400,
  }
});

const errorStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'Lato-Regular',
        color: colors.primary.purple,
        fontSize: 20,
        width: 260,
    }
});