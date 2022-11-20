<?php 
$ini = parse_ini_file('Lab5.ini');
$restaurants = simplexml_load_file($ini["path"]);

//sending restaurant details as json
if (!isset($_GET["action"]))
{
    $restaurantNames = array();
    for ($index = 0; $index < count($restaurants); $index++) {
        $name = strval($restaurants->Resturant[$index]->Name);
        $restaurantNames [] = $name;
    }
    echo json_encode($restaurantNames);
}
// sending restauranr details
if (isset($_GET["action"]) && $_GET["action"] == "restaurantDetails" ){
    $id = (int)$_GET["id"];
    if($id !== -1){
        $selectedRestaurant = $restaurants -> Resturant[$id];
        $restaurantDetails['street'] = strval($selectedRestaurant->Address->Street);
        $restaurantDetails['city'] = strval($selectedRestaurant->Address->City);
        $restaurantDetails['province'] = strval($selectedRestaurant->Address->Province);
        $restaurantDetails['postalCode'] = strval($selectedRestaurant->Address->PostalCode);
        $restaurantDetails['summary'] = strval($selectedRestaurant->Summary);
        $restaurantDetails['rating'] = strval($selectedRestaurant->Rating);
        $restaurantDetails['ratingMin'] = "1";
        $restaurantDetails['ratingMax'] = "5";
               
        echo json_encode($restaurantDetails);
        
    }
}

?>

