import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { observer } from 'mobx-react-lite';
import { globalVariables, messages } from '../stores/store';
import { talk } from '../api/api';
import { CommentStyles } from '../stores/styles';

export default observer(() => {
    const commentViewRef = useRef<ScrollView>(null);

    const handleContentSizeChange = () => {
        commentViewRef.current?.scrollToEnd({ animated: true });
    };

    useEffect(() => {
        commentViewRef.current?.scrollToEnd({
            animated: false
        })

        if (messages.list.length === 0 && !globalVariables.firstTime) {
            globalVariables.setInitialLoad(true)
            talk({
                id: 0,
                timestamp: 0,
                message: "Hello there"
            })
        }
    }, [])

    return (
        <ScrollView
            style={CommentStyles.commentView}
            contentContainerStyle={{ alignItems: 'flex-end' }}
            ref={commentViewRef}
            onContentSizeChange={handleContentSizeChange}
            onLayout={handleContentSizeChange}
        >
            <View style={CommentStyles.commentInnerScrollView}>
                {
                    messages.list.map((x, i) =>
                        <TouchableOpacity key={i} style={CommentStyles.commentBlock}>
                            <TouchableOpacity style={x.from === 0 ? CommentStyles.commentUserAvatar : CommentStyles.commentSystemAvatar}>
                                {x.from === 0 ? // user: 0
                                    <FontAwesome5 name="user-alt" size={15} color="#fff" />
                                    :
                                    <MaterialCommunityIcons name="robot" size={20} color="#fff" />
                                }
                            </TouchableOpacity>
                            <Text style={CommentStyles.commentText}>{`${x.message}`}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </ScrollView>
    )
})
