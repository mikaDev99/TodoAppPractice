<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Route("/api/todo", name="api_todo")
 */
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    /**
     * @Route("/read", name="api_ todo_read", methods={"GET"})
     */
    public function index()
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/create", name="api_todo_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());


        $form = $this->createForm(TodoType::class);
        $form->submit((array)$content);

        if (!$form->isValid()) {
            $errors = [];
            foreach($form->getErrors(true, true) as $error){
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }

            return $this->json([
                'message' => ['text' => join("\n", $errors), 'level' => 'error'],
            ]);
        }

        $todo = new Todo();

        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => ['La tarea debe ser Unica y no superar 10 caracteres'], 'level' => 'error']
            ]);
        }

        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => ['La tarea ha sido creada!', 'Tarea:' . $content->task, 'Descripcion:' . $content->description], 'level' => 'success']
        ]);
    }


    /**
     * @Route("/update/{id}", name="api_todo_update", methods={"PUT"})
     * @param Request $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent());
        

        $form = $this->createForm(TodoType::class);
        $nonObject = (array)$content;
        unset($nonObject['id']);
        dd($nonObject);
        $form->submit($nonObject);

        if (!$form->isValid()) {
            $errors = [];
            foreach($form->getErrors(true, true) as $error){
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }

            return $this->json([
                'message' => ['text' => join("\n", $errors), 'level' => 'error'],
            ]);
        }


        if ($todo->getTask() === $content->task && $todo->getDescription() === $content->description) {
            return $this->json([
                'message' => ['text' => 'No hubo ningun cambio en la tarea. Ni el nombre y la descripcion fue cambiada', 'level' => 'error']
            ]);
        }

        $todo->setTask($content->task);
        $todo->setDescription($content->description);


        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'No pudo ser enviada al servidor cuando se intento actualizar la tarea', 'level' => 'error']
            ]);
        }

        return $this->json([
            'todo'    => $todo->toArray(),
            'message' => ['text' => 'La tarea ha sido actualizada!', 'level' => 'success']
        ]);
    }


    /**
     * @Route("/delete/{id}", name="api_todo_delete", methods={"DELETE"})
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            //error
        }

        return $this->json([
            'message' => 'La tarea ha sido eliminada',
        ]);
    }
}
