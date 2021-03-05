<?php

namespace App\Form;

use App\Entity\Todo;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

    class TodoType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $builder
                ->add('id')
                ->add('task', TextType::class, [
                    'constraints' => [
                        new NotBlank(['message' => 'El nombre de la tarea no puede quedar en blanco!']),
                        new Length([
                            'min' => 1,
                            'max' => 10,

                            'minMessage' => 'Ingresa al menos 1 caracter!',
                            'maxMessage' => 'Ingresaste {{ value }}, pero no puede superar el limite de {{ limit }} caracteres!',
                        ])
                    ]
                ])
                ->add('description', TextareaType::class, [
                    'constraints' => [
                        new NotBlank(['message' => 'La descripcion no puede quedar en blanco!']),
                        new Length([
                            'min' => 1,
                            'max' => 500,

                            'minMessage' => 'Ingresa al menos 1 caracter!',
                            'maxMessage' => 'Ingresaste {{ value }}, pero no puede superar el limite de {{ limit }} caracteres!',
                        ])
                    ]
                ]);
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => Todo::class,
                'csrf_protection' => false,
            ]);
        }
    }
