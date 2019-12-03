import 'package:flutter/material.dart';

void main() => runApp(BudgetyApp());

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
                textAlign: TextAlign.center, style: TextStyle(color:Colors.lightGreen, fontSize: 20)),
        ),
      ),
    );
  }
}