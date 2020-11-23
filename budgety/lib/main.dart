import 'package:flutter/material.dart';
import 'package:quick_actions/quick_actions.dart';

final QuickActions quickActions = new QuickActions();

void main() {
  //WidgetsFlutterBinding.ensureInitialized();

  runApp(BudgetyApp());

  quickActions.initialize(handleQuickAction);

  quickActions.setShortcutItems(<ShortcutItem>[
    const ShortcutItem(
        type: 'action_newSpending',
        localizedTitle: 'Add spending',
        icon: 'icon_new'),
  ]);
}

void handleQuickAction(actionType) {
  if (actionType == 'action_newSpending') {
    print('Add Spending action invoked!');
  }
}

class BudgetyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.lightGreen,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Budgety'),
        ),
        body: Center(
          child: Text('This is a Budgety app! :)',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.lightBlue, fontSize: 20)),
        ),
      ),
    );
  }
}
